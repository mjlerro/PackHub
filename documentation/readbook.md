# PackHub Deploy Runbook
To start, we must create a place to put our web application to deploy it, so we need to create a virtual machine with a public IPv4 address. You can use anything you are comfortable with to create a virtual machine, but we are going to go over how to put the web application on a AWS hosted EC2 instance.

## Provisioning AWS EC2 Instance

 1. Sign into AWS console [here](https://aws.amazon.com/console/) (create an account if you don't have one)
 2. Navigate to the search bar on the top of the page and search for **EC2** and click the first result _Virtual Servers in the Cloud_
 3. This will take you to the EC2 console.
 4. Create a new security group to use on the VM. _See **Create a New Security Group** Section_
 5. Create a new key pair to use to access the VM. _See **Create a New Key Pair** Section_
 6. Navigate to the "Instances" area under _**Instances**_ on the left bar.
 7. From here we can see all the EC2 instances that we have.
 8. To create a new instance, click the orange "Launch instances" button on the right of the console.
 9. From the resulting AMI selector page, select one of the images that are "Free tier eligible". We are going to going with **Amazon Linux 2 AMI (HVM) - Kernel 5.10, SSD Volume Type** (or which ever is the first one on the list). Click the blue select button.
 10. From the resulting page (Choose an Instance Type) select the **t2.micro** image type that is highlighted with the free "Free tier eligible" marker.
 11. Click the blue button on the bottom "Review and Launch"
 12. From the resulting page (Review Instance Launch) select the "Edit security groups" link in blue.
 13. From the resulting page (Configure Security Group) select **Select an exisiting security group** and select the security group that you created in step 4.
 14. Click the blue button "Review and Launch" (from this point you are ready to create the instance.
 15. From the resulting page (Review Instance Launch) select the blue button "Launch".
 16. From the resulting popup (Select an existing key pair or create a new key pair), select **Choose an existing key pair** in the first dropdown and select the key pair you created in step 5.
 17. Click the last acknowledgement checkbox then click the blue button "Launch Instances"
 18. Your instance has now been created! Go to the **Accessing Your New Instance** section to learn how to login to the instance to start deploying your application.

### Creating a New Security Group
 1. Navigate to the "Security Groups" area under _**Network & Security**_
 2. Click the orange "Create security group" button on the right of the security groups console.
 3. Input any security group name and description that you choose so that you can idenfify it later when we create the VM.
 4. Now, we are going to add two new inbound rules, one that allows for access from anywhere on port 22 and one that allows all inboard traffic from port 80 from any location (0.0.0.0). **Talk more about this**
 5. Now, we are going to add one new outbound rule that allows for outbound for all traffic on all port ranges from any location (0.0.0.0). **Talk more about this**
 6. Click the orange button "Create security group" to create the new security group.

### Creating a new Key Pair
1. Navigate to the "Key Pairs" area under **Network & Security**
2. Click the orange "Create key pair" button on the right of the key pairs console.
3. From the resulting page (Create key pair) enter the name of the key pair and keep the rest of the settings the same (RSA and .ppk unless you know you what to do with a .pem file).
4. Click the orange "Create key pair" button and save it somewhere on your computer where you will find it.

### Accessing Your New Instance
1. Navigate to the "Instances" area under **Instances**
2. Click the blue link under "Instance ID"
3. From the resulting page "Instance summary for (_instance id_)" take note of the public IPv4 address and the public IPv4 DNS
4. Open PuTTY or any other tool you use to SSH and use:
	- User: ec2-user
	- IP address: _public IPv4 DNS_
	- Port: 22
	- Private Key: _downloaded key pair created earlier_ (in putty this is found under Connection->SSH->Auth)
5. Open the connection.
6. You should now be in the EC2 instance!

### Deploying PackHub
1. When you are in your new instance run these commands
	- `sudo yum check-update`
	- `sudo amazon-linux-extras install -y nginx1`
	- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
	- `. ~/.nvm/nvm.sh`
	- `nvm install node`
	- `sudo yum install git -y`
	- `npm install pm2 -g`
2. run `sudo vim /etc/nginx/nginx.conf`
3. On line 38 of the file add/replace this
```
server {
    listen 80;
    root /srv/PackHub/packhub-app/build/;
    index index.html index.htm;

    location / {
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    } 
}
```
4. Hit the ESC key in vim and type :wq to write to the file and close the editor.
5. In the `.\WEBAPP-01\packhub` directory of PackHub run `npm run build`. This will create a folder named `\build` in the `\packhub` directory.
6. Use FileZilla or any SFTP service to transfer the `\build` folder into the `\srv\PackHub\packhub-app\` directory.
7. In your EC2 instance, navigate to `\srv\PackHub\packhub-app\` and run git clone for the PackHub repository to bring it into the server.
8. The `\srv\PackHub\packhub-app\` directory should now have the `\build` and `\WEBAPP-01` directories.
9. Change into the `\srv\PackHub\packhub-app\WEBAPP-01\packhub` directory and run `npm install` to get all the node packages for the application.
10. Now, to start the api we are going to use pm2 to keep it perpetually running! To do this, from `\srv\PackHub\packhub-app\WEBAPP-01\packhub\` run this command:
	- `pm2 start /src/server/server.js`
	- This will start the application until you run `pm2 stop server`
11. Now we will run this command to test your nginx config and reload nginx if it passes:
	- `nginx -t && nginx -s reload`
	- You can also use the systemctl commands found [here](https://phoenixnap.com/kb/nginx-start-stop-restart)
12. The application should now be running. You can test this by going to the public IPv4 address you noted down in step 3 of _**Accessing Your New Instance**_ in your browser.
13. We are going to set up one last thing. In the event that the virtual machine ever goes down unexpectedly we want nginx to restart automaticaly. To do this, run this command from within your virtual machine:
    - `sudo systemctl enable nginx`
