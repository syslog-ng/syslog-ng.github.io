---
title: Python parser
id: adm-parser-python
description: >-
    The Python log parser (available in syslog-ng OSE version 3.10 and
    later) allows you to write your own parser in Python. Practically, that
    way you can process the log message (or parts of the log message) any
    way you need. For example, you can import external Python modules to
    process the messages, query databases to enrich the messages with
    additional data, and many other things.
---

{% include doc/admin-guide/python-blocks-generic.md %}

**Declaration**

Python parsers consist of two parts. The first is a syslog-ng OSE parser
object that you use in your syslog-ng OSE configuration, for example, in
the log path. This parser references a Python class, which is the second
part of the Python parsers. The Python class processes the log messages
it receives, and can do virtually anything that you can code in Python.

```config
parser <name_of_the_python_parser>{
    python(
        class("<name_of_the_python_class_executed_by_the_parser>")
    );
};

python {
class MyParser(object):
    def init(self, options):
        '''Optional. This method is executed when syslog-ng is started or reloaded.'''
        return True
    def deinit(self):
        '''Optional. This method is executed when syslog-ng is stopped or reloaded.'''
        pass
    def parse(self, msg):
        '''Required. This method receives and processes the log message.'''
        return True
};
```

## Methods of the python() parser

{% include doc/admin-guide/python-init.md %}

```config
parser my_python_parser{
    python(
        class("MyParser")
        options("regex", "seq: (?P<seq>\\d+), thread: (?P<thread>\\d+), runid: (?P<runid>\\d+), stamp: (?P<stamp>[^ ]+) (?P<padding>.*$)")
    );
};

class MyParser(object):
    def init(self, options):
        pattern = options["regex"]
        self.regex = re.compile(pattern)
        self.counter = 0
        return True
```

### parse(self, log_message)

The parse() method processes the log messages it receives, and can do
virtually anything that you can code in Python. This method is required,
otherwise syslog-ng OSE will not start.

The return value of the parse() method must be True. If it returns
False, or raises an exception, syslog-ng OSE will drop the message.

- To reference a name-value pair or a macro in the Python code, use
    the following format. For example, if the first argument in the
    definition of the function is called log-message, the value of the
    HOST macro is log-message\[\'HOST\'\], and so on. (The log-message
    contains the entire log message (not just the text body) in a
    structure similar to a Python dict, but it is actually an object.)

- You can define new name-value pairs in the Python function. For
    example, if the first argument in the definition of the function is
    called log-message, you can create a new name-value pair like this:
    log\_message\[\"new-macro-name\"\]=\"value\". This is useful when
    you parse a part of the message from Python, or lookup a value based
    on data extracted from the log message.

    Note that the names of the name-value pairs are case-sensitive. If
    you create a new name-value pair called new-macro-name in Python,
    and want to reference it in another part of the syslog-ng OSE
    configuration file (for example, in a template), use the
    **\${new-macro-name}** macro.

{% include doc/admin-guide/notes/hard-macros.md %}

- To list all available keys (names of name-value pairs), use the
    **log\_message.keys()** function.

{% include doc/admin-guide/python-deinit.md %}

## Example: Parse loggen logs

The following sample code parses the messages of the loggen tool (for
details, see [[The loggen manual page]].  
The following is a sample loggen message:

><38>2017-04-05T12:16:46 localhost prg00000[1234]: seq: 0000000000, thread: 0000,  
>runid: 1491387406, stamp: 2017-04-05T12:16:46 >PADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADDPADD

The syslog-ng OSE parser object references the LoggenParser class and
passes a set of regular expressions to parse the loggen messages. The
init() method of the LoggenParser class compiles these expressions into
a pattern. The parse method uses these patterns to extract the fields of
the message into name-value pairs. The destination template of the
syslog-ng OSE log statement uses the extracted fields to format the
output message.

```config
    @version: 3.38
    @include "scl.conf"
    parser my_python_parser{
        python(
            class("LoggenParser")
            options("regex", "seq: (?P<seq>\\d+), thread: (?P<thread>\\d+), runid: (?P<runid>\\d+), stamp: (?P<stamp>[^ ]+) (?P<padding>.*$)")
        );
    };
    log {
        source { tcp(port(5555)); };
        parser(my_python_parser);
        destination {
            file("/tmp/regexparser.log.txt" template("seq: $seq thread: $thread runid: $runid stamp: $stamp my_counter: $MY_COUNTER"));
        };
    };
    python {
    import re
    class LoggenParser(object):
        def init(self, options):
            pattern = options["regex"]
            self.regex = re.compile(pattern)
            self.counter = 0
            return True
        def deinit(self):
            pass
        def parse(self, log_message):
            match = self.regex.match(log_message['MESSAGE'])
            if match:
                for key, value in match.groupdict().items():
                    log_message[key] = value
                log_message['MY_COUNTER'] = self.counter
                self.counter += 1
                return True
            return False
    };
```

## Example: Parse Windows eventlogs in Python - performance

The following example uses regular expressions to process Windows log
messages received in XML format from the syslog-ng Agent for Windows
application. The parser extracts different fields from messages received
from the Security and the Application eventlog containers. Using the
following configuration file, syslog-ng OSE could process about 25000
real-life Windows log messages per second.

```config
@version: 3.38

options {
    keep-hostname(yes);
    keep-timestamp(no);
    stats-level(2);
    use-dns(no);
};

source s_network_aa5fdf25c39d4017a8e504cdb641b477 {
    network(
        flags(no-parse)
        ip(0.0.0.0)
        log-fetch-limit(1000)
        log-iw-size(100000)
        max-connections(100)
        port(514)
    );
};

parser p_python_parser_79c31da44bb64de6b5de84be4ae15a15 {
    python(options("regex_for_security", ".* Security ID:  (?P<security_id>\\S+)   Account Name:  (?P<account_name>\\S+)   Account Domain:  (?P<account_domain>\\S+)   Logon ID:  (?P<logon_id>\\S+).*Process Name: (?P<process_name>\\S+).*EventID (?P<event_id>\\d+)", "regex_others", "(.*)EventID (?P<event_id>\\d+)")
class("EventlogParser"));
};

destination d_file_78363e1dd90c4ebcbb0ee1eff5a2e310 {
    file(
        "/var/testdb_working_dir/fcd713a2-d48e-4025-9192-ec4a9852cafa.$HOST"
        flush-lines(1000)
        log-fifo-size(200000)
    );
};

log {
    source(s_network_aa5fdf25c39d4017a8e504cdb641b477);
    parser(p_python_parser_79c31da44bb64de6b5de84be4ae15a15);
    destination(d_file_78363e1dd90c4ebcbb0ee1eff5a2e310);
    flags(flow-control);
};

python {
import re
class EventlogParser(object):
    def init(self, options):
        self.regex_security = re.compile(options["regex_for_security"])
        self.regex_others = re.compile(options["regex_others"])
        return True
    def deinit(self):
        pass
    def parse(self, log_message):
        security_match = self.regex_security.match(log_message['MESSAGE'])
        if security_match:
            for key, value in security_match.groupdict().items():
                log_message[key] = value
        else:
            others_match = self.regex_others.match(log_message['MESSAGE'])
            if others_match:
                for key, value in others_match.groupdict().items():
                    log_message[key] = value
        return True
};
```
