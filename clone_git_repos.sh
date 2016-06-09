#!/bin/sh

echo "Checking for existing GrovePi clone..."
if [ -e "GrovePi" ]
then
  cd GrovePi
  git pull
  if [ $? -eq 0 ]
  then
    echo "GrovePi successfully updated."
    exit 0
  else
    echo "Error updating GrovePi."
    echo 1
  fi
fi

echo "Getting GrovePi from git..."
git clone https://github.com/rbultman/GrovePi

if [ $? -eq 0 ]
then
  echo "GrovePi retrieved from git."
else
  echo "Error getting GrovePi from git.  Check your internet connection."
  exit 1
fi

exit 0
