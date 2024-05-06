## default-priority()

| Type:|  priority string |
|  Default: | {{ page.priority_default | default: '' }} |

*Description:* This parameter assigns an emergency level to the messages
received from the {{ page.src | default: 'file' }} source if the message does not specify one. For
example, default-priority(warning).
