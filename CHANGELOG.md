# 2.0.0
Finally fix tuner gains array issue - will now return a pure javascript array (not buffer)

Bumping to new version because future updates will create breaking changes - switching from returning buffers to returning javascript arrays, both to ossify parsing (i.e. int is 4 buffer bytes long, whereas 1 long as an array which is preferred to prevent users from having to do more parsing)

# 1.3.3
Fixes to readAsync, cancelAsync should work now

# 1.3.2
Extra examples, some ease of use stuff

# 1.3.1
readAsync works, but cancelAsync does not

this means that if you want to use asynchronous operations they are unstoppable (I have no clue why it does not work)

# 1.3.0
Update packages, simple fixes (prepare for async)
