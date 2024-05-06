## class()

|Type:   |   string|
|Default: |  N/A|

*Description:* The name of the Python class that implements the {{ page.class_type }}, for example:

```config
python(
    class("{{ page.python_class }}")
);
```

If you want to store the Python code in an external Python file, the
class() option must include the name of the Python file containing the
class, without the path and the .py extension, for example:

```config
python(
    class("MyPythonfilename.{{ page.python_class }}")
);
```

For details, see [[Python code in external files]]
