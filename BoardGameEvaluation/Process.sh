#!/bin/bash
#Author		: Nick (廖冠登)
#Date		: 20141111
#Description	: The main process for installing the game

#Read the parameters from config
VarCurrentPosition=$(pwd)
. $VarCurrentPosition/ProcessParameter.cfg
mysql --host="$Varstr_Host" --user="$Varstr_User" --password="$Varstr_Password"
