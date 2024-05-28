## ip() or localip()

|  Type:|      string|
  |Default:|   0.0.0.0|

*Description:* The IP address to bind to. By default, {{ site.product.short_name }}
listens on every available interface. Note that this is not the address
where messages are accepted from.

If you specify a multicast bind address and use the **udp** transport,
{{ site.product.short_name }} automatically joins the necessary multicast group. TCP
does not support multicasting.
