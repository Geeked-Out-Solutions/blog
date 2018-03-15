---
layout: post
title: Automating Cisco UCS Deployment With Ansible and Python
date: '2018-03-15'
category: 'datacenter, automation'
tags:
  - cisco
  - ucs
  - automation
  - datacenter
  - ansible
  - python
---
In today's blog we will be going over how to automate a Cisco UCS deployment using some custom ansible modules I made in python using [Cisco UCS SDK](https://communities.cisco.com/docs/DOC-64378).



# What Is Ansible
[Ansible](https://www.ansible.com) is a great system and I love using it to automate things.  It is meant to be a configuration management, provisioning, and task execution software.  You are also able to write your own custom modules to perform actions on things which is what we will be doing today in this blog.  If you aren't familiar with Ansible I urge you to do some training on it as it can save a lot of time.

# Source Code
All the source code for today's blog can be found at the below two links:
* Ansible configuration/playbooks - [Here](https://github.com/btotharye/ansible-ucs)
* Ansible docker deployment - [Here](https://github.com/btotharye/ansible-ucs-deploy)

# Things You Will Need
1. A Cisco UCS Manager instance, I'm using the [UCS Platform Emulator](https://communities.cisco.com/docs/DOC-71877) in this demo to showcase how the playbooks work and how I build and test them.  Your UCSM will need a virtual IP at least setup for these playbooks to work.

2. Docker installed on a machine that can reach your UCS instance.  If you are already familiar with Ansible and have it installed you don't need this.

3. Git installed so you can clone my repo or you can download the files and upload them to the box you will be deploying from. 

# The Structure of The Playbooks/Site File
So in the ansible playbook code located [here](https://github.com/btotharye/ansible-ucs) you will see a few different folders and files.  Most you don't have to be really concerned with at first to use this setup.

I have split up the different folder locations into sections below that we will go over their use.

## Group Vars
These are where you can put in variables that are used in the playbooks and can be per site location, etc.  In our case we are using it to specify our ntp servers and dns ip's we want added in our playbooks.  For more in depth information please visit [here](http://docs.ansible.com/ansible/latest/intro_inventory.html#group-variables)

## Roles
This is where you can setup a role file to include lots of different playbook options and combine them into 1 file to kick off.  This way if you have say a Apache webhost you can ensure all packages are installed, firewall is open, etc.  Or if you are wanting to update a bunch of machines and perform multiple actions you can create role files for this to perform different combined actions.

For more information on roles please visit [here](http://docs.ansible.com/ansible/latest/playbooks_reuse_roles.html)

## Site.yml
This is considered the master playbook.  Typically you would have other playbooks configured for say webservers, dns servers, etc then just import them into this, since our project is fairly small we aren't doing this atm.

For more information on how to use the site.yml in bigger setups please visit [here](http://docs.ansible.com/ansible/latest/playbooks_best_practices.html)

## Playbooks
These are our bread and butter of Ansible if you will.  These are what tell Ansible what actions to perform.  In our case you can see some are to add ntp, add vlans/vsans, configure callhome, etc.  So we can easily already with this basic layout do a minimal UCS deployment with 1 command and setup multiple domains the same or have different configuration for each domain.

More information on playbooks can be found [here](http://docs.ansible.com/ansible/latest/playbooks.html)


## Library
These are where my custom python/ansible modules are.  I built these to interact with the UCS Python SDK that UCSM supports and that is how we are able to set all of this up.

More information on creating your own custom ansible modules can be found [here](http://docs.ansible.com/ansible/latest/dev_guide/developing_modules.html)

## Inventory
This is where we specify our UCSM instances and login information that we want to perform our playbooks against.


# Automating UCS Deployment
Ok so lets now automate our UCS setup and test out our site.yml file with some of the playbook options we have configured.

## Setting Up Deployment Machine
So on whatever machine you want to deploy from and can reach the UCSM instance please run through the below configuration to ensure you have the proper files and setup:

1. Clone the ansible modules locally - `git clone https://github.com/btotharye/ansible-ucs.git`

2. Ensure you have docker installed instructions for installing docker can be found [here](https://www.docker.com/community-edition#/download).  Otherwise make sure you have Ansible installed if you don't want to use docker.

### Docker Deployment Setup
1. Clone the docker deployment files - `git clone https://github.com/btotharye/ansible-ucs-deploy.git`

2. CD to the newly created folder - `cd ansible-ucs-deploy`

3. Build the image - `docker build -t ansible-ucs .`

## Setting Up Our Configuration Files
Now we need to setup our configuration files with our options in order to deploy to our UCS.  We will be modifying the inventory file and site.yml files to the values you would like applied on UCS so let's get started.

## Modify Inventory File
Open up the inventory file in your favorite text editor and ensure the ucsm_ip, ucsm_login, and ucsm_pw match your settings.  I named mine ucspe which is the first part of the line but feel free to make this whatever you want.

Example:
```yaml
[ucs]
ucspe ucsm_ip=192.168.0.1 ucsm_login=ucspe ucsm_pw=ucspe
```

## Modify Roles File
Now we need to modify our site file to change the configuration options we want.  Now I have it populated already with some of the playbooks/libraries already setup.  Feel free to look around at the library folder and in the files and they are documented on how to use them.  For example in the ucs_snmp.py file you can see I have it documented at the top of the file as far as what has to go in your site.yml or playbook files:

```yaml
EXAMPLES = '''
- name: Configure/Enable SNMP {{ucsm_ip}}
    ucs_configure_snmp:
      ip={{ucsm_ip}}
      login={{ucsm_login}}
      password={{ucsm_pw}}
      sys_location='Raleigh NC'
      community='community'
      admin_state='enabled'
      sys_contact='Bdub'
- name: Disable SNMP {{ucsm_ip}}
    ucs_configure_snmp:
      ip={{ucsm_ip}}
      login={{ucsm_login}}
      password={{ucsm_pw}}
      admin_state='disabled'
- name: Add SNMP Trap {{ucsm_ip}}
    ucs_snmp:
      ip={{ucsm_ip}}
      login={{ucsm_login}}
      password={{ucsm_pw}}
      v3_priv='noauth'
      hostname='192.168.1.1'
      community='test'
      version='v3'
      notify_type='traps'
      port='162'
```

So for our use case we are just going to modify the role already created called admin which you can see from the site.yml file we are specifying.  So we are going to open the roles/admin/tasks/main.yml up in your favorite editor I prefer [Atom](https://atom.io/) myself.  Below I have the example from our site.yml file which you can see then calls our role admin which is where all our actual configuration is that we will be changing.

**Site.yml**
```yaml
---
- hosts: ucs
  connection: local
  gather_facts: no
  roles:
  - admin
```

You can see in the above configuration we are saying we want this to apply to the ucs hosts we have specified in our inventory file and we want to run the role admin.

**roles/admin/tasks/main.yml (AKA Admin role)**
```yaml
---

- name: Add NTP Entry {{ucsm_ip}}
  ucs_ntp:
    ntp_servers: "{{ ntp_servers }}"
    ip: "{{ucsm_ip}}"
    login: "{{ucsm_login}}"
    password: "{{ucsm_pw}}"
    state: "add"

- name: Add DNS Entry {{ucsm_ip}}
  ucs_dns:
    dns_ip: "{{ dns_ip}}"
    ip: "{{ucsm_ip}}"
    login: "{{ucsm_login}}"
    password: "{{ucsm_pw}}"
    state: "add"

- name: Configure Callhome {{ucsm_ip}}
  ucs_callhome:
    admin_state="on"
    urgency="warning"
    throttle_state="on"
    contact="Brian Hopkins"
    phone="+1123-123-1234"
    email="email@test.com"
    addr="123 Test Drive"
    customer="1234"
    contract="12345"
    site="123"
    r_from="email_from@test.com"
    reply_to="email_to@test.com"
    host="192.168.1.1"
    port="25"
    ip="{{ucsm_ip}}"
    login="{{ucsm_login}}"
    password="{{ucsm_pw}}"

- name: Adding Vlan {{ucsm_ip}}
  ucs_vlan:
    ip="{{ucsm_ip}}"
    login="{{ucsm_login}}"
    password="{{ucsm_pw}}"
    vlan_name='vlan_'
    vlan_id='10'
    mcast_policy_name=''
    policy_owner='local'
```

Now all we have to do in order to customize this for your setup is change the corresponding values in each of these.  Remember we also used group vars so we will have to modify the values in there as well since we are using {{ ntp_servers }} and {{ dns_ip }}.  This is how you can specify values from the group vars file into your playbooks.

So modify the above to your liking and save it then modify the group_vars file as well to include the IP's you want below is our example, you could also move some of the data from the role into the group vars file as well.

**group_vars/all**
```yaml
---

ntp_servers:
  - "192.168.1.1"
  - "192.168.1.2"
  - "192.168.1.3"


dns_ip:
  - "192.168.1.4"
  - "192.168.1.5"
  - "192.168.1.6"
```

# Pushing Our Configuration
Great now if everything is setup correctly we should now be ready to push our configuration to our UCS.  We just need to ensure we know what our path is to our UCS ansible files then perform the below command replacing the /path/ansible-ucs to whatever path your files are in:

`docker run -it -v /path/ucsm-ansible:/opt/ansible-ucs ansible-ucs ansible-playbook -i inventory site.yml`

If successful you should see output like below in the screen:

![Ansible Deployment Screenshot](/assets/images/ansible_ss.jpg)

**For More Verbose logging if you run into issues you can modify the docker run to be like below:***

**docker run -it -v /path/ucsm-ansible:/opt/ansible-ucs ansible-ucs ansible-playbook -i inventory site.yml -vvv**


So now we can check our UCS and all our configuration should be there.  I will be adding more to this repository over the coming weeks and hope to get a full end to end setup playbook going very shortly.  I hope you liked this introduction to automating UCS with Ansible and Python and if you have any issues please comment below and I will try my best to help.
