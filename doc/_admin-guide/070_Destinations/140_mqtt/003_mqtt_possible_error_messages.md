---
title: Possible error messages you may encounter while using the mqtt() destination
short_title: Possible error messages
id: adm-dest-mqtt-err
---

While using the mqtt() destination, you may encounter issues and
corresponding error messages originating from the MQTT system. The
following table contains the error messages you may encounter, the
possible reasons behind them, and potential workaround methods.

<table>
    <tr>
        <td><b>Complete error message</b></td>
        <td><b>Possible reason(s)</b></td>
        <td><b>Possible solution(s)</b></td>
    </tr>
    <tr>
        <td>"ERROR, while init threaded dest. ..."</td>
        <td>The syslog-ng OSE application will not start.</td>
        <td>You can try the following methods:  
            <ul>
                <li>Restart syslog-ng OSE.</li>
                <li>Stop some of the programs running on your computer.</li>
                <li>Restart your computer, and then restart syslog-ng OSE.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>"mqtt: the topic() argument is required for mqtt destinations. ..."</td>
        <td>The topic() option is not set in your configuration. The syslog-ng OSE application will not start.</td>
        <td>Set the missing topic() option in your configuration, then restart.</td>
    </tr>
    <tr>
        <td>"The mqtt destination does not support the batching of messages, ..."</td>
        <td> Your configuration may contain the batch-timeout() and / or batch-lines() options, which are not supported by the mqtt() destination. The syslog-ng OSE application will not start.</td>
        <td>If your configuration contains the batch-timeout() and / or batch-lines() options, remove them from your configuration, and restart.</td>
    </tr>
    <tr>
        <td>"Disconnected during publish!</td>
        <td>The syslog-ng OSE application can not send the message, because syslog-ng OSE disconnected from the broker. By default, syslog-ng OSE attempts to reconnect to the broker and send the messages 3 times.</td>
        <td>If syslog-ng OSE fails all 3 attempts to reconnect to the broker and send the messages, you can try checking your configuration or restarting your MQTT system with syslog-ng OSE as a client.</td>
    </tr>
    <tr>
        <td>"Max message inflight! (publish)"</td>
        <td>The syslog-ng OSE application can not send the message due to the max message inflight broker response code (which signals that the broker has received too many messages, and it needs more time to process them). The syslog-ng OSE application will attempt to resend the message.</td>
        <td>Wait until the broker can process the in-flight messages and syslog-ng OSE can attempt to resend the message.</td>
    </tr>
    <tr>
        <td>"Failure during publishing!"</td>
        <td>The syslog-ng OSE application can not send the message due to the failure broker response code. The syslog-ng OSE application will attempt to resend the message.</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>"Error during publish!"</td>
        <td>The syslog-ng OSE application can not send the message, and drops it.  
Possible reason:    
bad\_utf8\_string (topic), NULL parameter.                    

That is, the most probable reasons behind this issue are either that the topic name in your configuration is not correct, or that the message field is empty.</td>
        <td>You can try the following methods:
            <ul>
                <li>Modify the name of the topic() option in your configuration.</li>
                <li>Make sure that the message field is not empty.</li>
            </ul>
         </td>
    </tr>
    <tr>
        <td>"Disconnected while waiting the response!"</td>
        <td>The syslog-ng OSE application has sent the message, but the client disconnected from the broker before syslog-ng OSE received the response. The syslog-ng OSE application will attempt to reconnect, or to resend the message.</td>
        <td>The syslog-ng OSE application will attempt to reconnect to the broker and send the in-flight message. If the reconnect attempt fails, syslog-ng OSE will resend the message.</td>
    </tr>
    <tr>
        <td>"Error while waiting the response!"</td>
        <td>The syslog-ng OSE application can not get any response from the broker, due to the failure broker response code. The syslog-ng OSE will attempt to resend the message.</td>
        <td>In this case, you will receive a further error message, depending on what the problem is. Wait for the second error message for more information about how you can proceed.</td>
    </tr>
    <tr>
        <td>"Error constructing topic ..."</td>
        <td>Due to an issue with the configured topic template, the mqtt() destination will use the fallback-topic() option instead.</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>"mqtt dest: topic name is illegal, it can't be empty"</td>
        <td>This error message is related to the \"Error constructing topic \...\" error message. In this case, the topic template returns a 0 length string. As a result, the mqtt() destination will use the fallback-topic() option instead.</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>"Error connecting mqtt client ..."</td>
        <td>The syslog-ng OSE application can not connect to broker, and it will attempt to reconnect later.</td>
        <td> **If the issue persists, you can try the following: Update your eclipse-paho-mqtt-c library.Restart syslog-ng OSE.**</td>
    </tr>
    <tr>
        <td>"Error creat mqtt client ..."</td>
        <td>The syslog-ng OSE application encountered an error while creating the MQTT client, and it will attempt to create it later. Possible reasons:
            <ul>
                <li>There is a wrong address() set in your configuration.</li>
                <li>The broker is not running.</li>
            </ul>
        </td>
      <td>**You can try the following methods: Check the address() option in your configuration, and modify if necessary.Check if the specified broker is running by connecting to it manually, and then sending the broker a message.**</td> 
    </tr>

</table>
