![]({{ site.baseurl}}/assets/images/caution.png) **CAUTION:**
The encrypted connection between the server and the client fails if the Common
Name or the subject_alt_name parameter of the server certificate does not
contain the hostname or the IP address (as resolved from the syslog-ng
clients and relays) of the server.
Do not forget to update the certificate files when they expire.
{: .notice--warning}

