#!/usr/bin/env python3
# input: fd3 text A
# input: fd4 text B
# output: fd5

import sys
import os
import json
import html
import re

print ('IN join.py')

inA = 3
inB = 4
out = os.fdopen (5, 'w')

lots=32767
stringA = os.read (inA, lots).decode('utf-8')
stringB = os.read (inB, lots).decode('utf-8')

#print (stringA + stringB)
out.write('fd 5')
