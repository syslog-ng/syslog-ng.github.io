---
title: Error messages
id: adm-debug-err
---

This section describes the most common error messages.

## Destination queue full

| Error message: | Destination queue full, dropping messages; queue_len='10000', log_fifo_size='10000' count='4',    persist_name='afsocket_dd_qfile(stream,serverdown:514)' |
| Description:   | This message indicates message loss. Flow-control must be enabled in the log path. When flow-control is enabled, syslog-ng will stop   reading messages from the sources of the log  statement if the destinations are not able to   process the messages at the required speed. If flow-control is enabled, syslog-ng will only drop messages if the destination queues/window sizes are improperly sized.
| Solution:      | Enable flow-control in the log path. If flow-control is disabled, syslog-ng will drop messages if the destination queues are full. Note that syslog-ng will drop messages even if the server is alive. If the remote server accepts logs at a slower rate than the sender syslog-ng receives them, the sender syslog-ng will fill up the destination queue, then drop the newer messages. Sometimes this error occurs only at a specific time interval, for example, only between`7:00`AM and`8:00`AM or between`16:00`PM and`17:00`PM when your users log in or log off and that generates a lot of messages within a short interval.                             |

For more information, see [[Managing incoming and outgoing messages with flow-control]]

## Alert unknown CA

| Error message: |     SSL error while writing stream; tls_error='SSL routines:ssl3_read_bytes:tlsv1 alert unknown ca' |
| Description:   | This message indicates that the other (remote) side could not verify the certificate sent by syslog-ng.|
| Solution:      | Check the logs on the remote site and identify why the receiving syslog-ng could not find the CA certificate that signed this certificate.          |

## PEM routines:PEM\_read\_bio:no start line

| Error message: |     testuser@thor-x1:~ cert_no_start_line/certs$ openssl x509 -in cert.pem -text unable to load certificate                   140178126276248:                              error:0906D06C:PEM routines:PEM_read_bio:no start line:pem_lib.c:701:Expecting: TRUSTED CERTIFICATE |
| Description:   | The error message is displayed when using Transport Layer Security (TLS). The syslog-ng application uses OpenSSL for TLS and this message indicates that the certificate contains characters that OpenSSL cannot process. The error occurs when the certificate comes from Windows and you want to use it on a Linux-based computer. On Windows, the end of line (EOL) character is different (\\r\\n) compared to Linux (\\n). To verify this, open the certificate in a text editor, for example, MCEdit. Notice the \^M characters as shown in the image below:          |
|| **Figure 24: Example of OpenSSL character processing error** ![]({{ adm_img_folder | append: '/170_Troubleshooting_syslog-ng/openssl_char_proc.png' }})|
|Solution:      | On Windows, save the certificate using UTF-8, for example, using Notepad++.|

>**NOTE:** Windows Notepad is not able to save the file in normal UTF-8, even if you select it.  
>
>1. In Notepad++, from the menu, select **Encoding**.
>2. Change the value from **UTF-8-BOM** to **UTF-8**.
>3. Save.
>
> - On Linux, run dos2unix cert.pem. This will convert the file to a Linux-compatible style.
> - Alternatively, replace the EOL characters in  the file manually.
{: .notice--info}