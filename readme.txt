download imager https://www.raspberrypi.org/software/
create file ssh
https://www.advanced-ip-scanner.com/ru/


sudo raspi-config

Download Bonjour Print Services for Windows v2.0.2


In the root folder of the SD card, open config.txt in Notepad++ (right click on the file and there should be an edit option)
Append this line to the bottom of that file:
 dtoverlay=dwc2
 or dtoverlay=dwc2,dr_mode=peripheral
Save the file


In the root folder of the SD card, open cmdline.txt in Notepad++
After rootwait, append this text leaving only one space between rootwait and the new text (otherwise it might not be parsed correctly):
 modules-load=dwc2,g_ether
If there was any text after the new text make sure that there is only one space between that text and the new text
Save the file



Under the same root folder of USB, create file called wpa_supplicant.conf (vi is my preferred file editor, you can use TextEdit or Notepad too)
Image for post
Type in the below details or copy paste from below (press i key for insert mode, paste contents and to save — Esc :wq )
Image for post
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
 ssid="TP-LINK_D696CE"
 psk="Oracledb_11"
 key_mgmt=WPA-PSK
}

L200
0968236492


raspberrypi.local

vnc viewer
1.44 inch LCD Hat
https://wavesharejfs.blogspot.com/2018/03/raspberry-pi-driv-144inch-lcd-hat-with.html
https://learn.adafruit.com/adafruit-2-2-pitft-hat-320-240-primary-display-for-raspberry-pi/backlight-control?view=all
https://www.youtube.com/watch?v=7nDJPidKSPA&ab_channel=BeauKnowsTech...Stuff

sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
sudo raspi-config
Зайдите в пункт меню: Interfacing Options VNC и подтвердите включение VNC кнопкой YES.
vncserver


sudo nano /etc/wpa_supplicant/wpa_supplicant.conf


for ftp
sudo apt-get install vsftpd

sudo nano /etc/vsftpd.conf

anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
chroot_local_user=YES
user_sub_token=$USER
local_root=/home/$USER/FTP



Control Panel\Network and Internet\Network Connections



apt-get -y install fbi
wget https://legacy.imagemagick.org/Usage/images/rose.png
fbi -d /dev/fb1 -T 1 -noverbose -a rose.png


Install C Library bcm2835



sudo nano /etc/modules
spi-bcm2835
flexfb
fbtft_device

sudo nano /etc/modprobe.d/fbtft.conf
options fbtft_device name=flexfb gpios=reset:27,dc:25,cs:8,led:24 speed=40000000 bgr=1 fps=60 custom=1 height=240 width=240
options flexfb setaddrwin=0 width=240 height=240 init=-1,0x11,-2,120,-1,0x36,0x70,-1,0x3A,0x05,-1,0xB2,0x0C,0x0C,0x00,0x33,0x33,-1,0xB7,0x35,-1,0xBB,0x1A,-1,0xC0,0x2C,-1,0xC2,0x01,-1,0xC3,0x0B,-1,0xC4,0x20,-1,0xC6,0x0F,-1,0xD0,0xA4,0xA1,-1,0x21,-1,0xE0,0x00,0x19,0x1E,0x0A,0x09,0x15,0x3D,0x44,0x51,0x12,0x03,0x00,0x3F,0x3F,-1,0xE1,0x00,0x18,0x1E,0x0A,0x09,0x25,0x3F,0x43,0x52,0x33,0x03,0x00,0x3F,0x3F,-1,0x29,-3


sudo reboot



FBTFT Device Tree enabled Kernel
RPi-Display (8-Bit SPI)
Open the file /boot/config.txt:

$ sudo nano /boot/config.txt
Add the following line at the file end (rotate can be 0, 90, 180, 270):

dtoverlay=rpi-display,speed=32000000,rotate=270



https://learn.adafruit.com/adafruit-2-2-pitft-hat-320-240-primary-display-for-raspberry-pi/easy-install
https://wavesharejfs.blogspot.com/2018/03/raspberry-pi-driv-144inch-lcd-hat-with.html
https://www.waveshare.com/w/upload/6/6b/1.3inch_lcd_hat_user_manual_en.pdf

/etc/rc.local
full/path/script/js < /dev/null &
omxplayer https://cast.radiogroup.com.ua/jamfm
omxplayer http://91.218.213.49:8000/ur1-mp3




options fbtft_device name=flexfb gpios=reset:27,dc:25,cs:8,led:24 speed=96000000 bgr=1 fps=60 custom=1 height=240 width=320
options flexfb setaddrwin=0 width=320 height=240 init=-1,0x11,-2,120,-1,0x36,0xA0,-1,0x3A,0x05,-1,0x21,-1,0x2A,0x00,0x01,0x00,0x3F,-1,0x2B,0x00,0x00,0x00,0xEF,-1,0xB2,0x0C,0x0C,0x00,0x33,0x33,-1,0xB7,0x35,-1,0xBB,0x1F,-1,0xC0,0x2C,-1,0xC2,0x01,-1,0xC3,0x12,-1,0xC4,0x20,-1,0xC6,0x0F,-1,0xD0,0xA4,0xA1,-1,0xE0,0xD0,0x08,0x11,0x08,0x0C,0x15,0x39,0x33,0x50,0x36,0x13,0x14,0x29,0x2D,-1,0xE1,0xD0,0x08,0x10,0x08,0x06,0x06,0x39,0x44,0x51,0x0B,0x16,0x14,0x2F,0x31,-1,0x29,-3
Modify the /boot/config.txt file and enable the SPI interface by adding the following line
dtparam=spi=on




which node outputs /home/pi/.nvm/versions/node/v7.5.0/bin/node
crontab -e
 and use nano
@reboot node /home/pi/radio/index.js >> /home/pi/radio/out.txt 2>&1

http://www.lcdwiki.com/3.5inch_RPi_Display

nano /home/pi/.config/lxsession/LXDE-pi/autostart
chromium-browser --kiosk http://localhost:3000/index.html


sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
chromium-browser --disable-features=AudioServiceOutOfProcess --kiosk http://localhost:3000/index.html




