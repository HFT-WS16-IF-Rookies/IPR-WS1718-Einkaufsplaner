#!/bin/bash
rootDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";

printf "generate new angular build\n";
ng build;

printf "\n";
printf "copy php scripts to new build\n";
rsync -avR --progress $rootDir/php/./. $rootDir/dist/;
