>**NOTE:** Starting with 3.26, syslog-ng OSE assigns a persist name to Python sources and
>destinations. The persist name is generated from the class name.  
>If you want to use the
>same Python class multiple times in your syslog-ng OSE configuration, add a unique
>persist-name() to each source or destination, otherwise syslog-ng OSE will not start.  
>  
>For example:  
>  
>```config  
>log {  
>    source { python(class(PyNetworkSource) options("port" "8080") persist-name("<unique-string>); };
>    source { python(class(PyNetworkSource) options("port" "8081")); };
>};  
>```
>  
> Alternatively, you can include the following line in the Python package:
> @staticmethod generate_persist_name. For example:
>  
>```python
>from syslogng import LogSource
>    class PyNetworkSource(LogSource):
>    @staticmethod
>    def generate_persist_name(options):
>        return options["port"]
>    def run(self):
>        pass
>    def request_exit(self):
>        pass
>```
>  
{: .notice--info}
