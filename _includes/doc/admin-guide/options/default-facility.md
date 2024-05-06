## default-facility()

|Type:| facility string|
|Default:| {{ page.facility_default | default: 'kern' }}|

*Description:* This parameter assigns a facility value to the messages
received from the {{ page.src | default: 'file' }} source if the message does not specify one.
