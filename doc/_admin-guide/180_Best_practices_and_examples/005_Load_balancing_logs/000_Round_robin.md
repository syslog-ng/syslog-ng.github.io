---
title: Load balancing with a round robin load balancing method based on the R_MSEC macro of syslog-ng OSE
short_title: Load balancing with round robin
id: adm-pract-round-robin
description: >-
  This section describes a round robin load balancing method based on the
  R_MSEC macro of syslog-ng Open Source Edition (syslog-ng OSE) to load
  balance your logs between multiple syslog-ng OSE destinations.
---

**TIP:** If R_MSEC is not precise enough, you can replace it with R_USEC
(which uses microseconds instead of milliseconds).
{: .notice--info}

For more information about the R_MSEC macro and further macros of
syslog-ng OSE, see [[Macros of syslog-ng OSE]].

## Example: round robin load balancing between multiple destinations

The following example is a round-robin load balancing method, based on
syslog-ng OSE's R_MSEC macro.

```config
destination d_lb_network { 
  channel { 
    channel { 
      filter { 
      "0" == "$(% ${R_MSEC} 2)" 
      }; 
      destination { 
        network("myhost1" 
          disk-buffer(mem-buf-length(10000) disk-buf-size(2000000))); 
      }; 
      flags(final); 
    }; 
  
    channel { 
    filter { 
    "1" == "$(% ${R_MSEC} 2)" 
    }; 

    destination { 
      network("myhost2" 
        disk-buffer(mem-buf-length(10000) disk-buf-size(2000000))); 
    }; 
    flags(final); 
    }; 
  }; 
};
```

The filter {\" \<return value \>\" == \"\$(% \${R_MSEC} 2)\"}; code
snippets (in bold) serve as the basis of the method. This filter
separates incoming log messages\' timestamp values based on the R_MSEC
macro, using a division with remainder method, and distributes the log
messages equally between two destinations based on the return value (in
this case, 0 or 1).

If you need a file instead of a network destination, replace the network
destination with the file in the example (and use the same analogy for
any other syslog-ng OSE destinations).

For an alternative method to use the round robin load balancing method
based on the R_MSEC macro, see
[[Configuration generator for the load balancing method based on MSEC hashing]].
