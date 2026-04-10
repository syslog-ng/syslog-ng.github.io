## qos()

<table>
  <tr>
    <td>Type:</td>
    <td>number</td>
  </tr>
  <tr>
    <td rowspan="3" style="vertical-align: top;">Accepted values:</td>
    <td><code>0</code> - at most once (the fastest option)</td>
  </tr>
  <tr>
    <td><code>1</code> - at least once (a much slower option than 0)</td>
  </tr>
  <tr>
    <td><code>2</code> - exactly once (the slowest option)</td>
  </tr>
  <tr>
    <td>Default:</td>
    <td><code>0</code></td>
  </tr>
</table>

*Description:* The Quality of Service (QoS) level in MQTT messaging is an agreement between sender and receiver on the guarantee of delivering a message.
