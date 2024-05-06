---
title: afsql
description: >-
  The afsql module has only one driver, which is the sql() destination driver.
  The sql() driver sends messages to a SQL database.
id: dev-macos-mod-sup-afsql
---

### Status

| Architecture | Status |
| :----------: | :----: |
|      x86     |  Works |
|      ARM     |  Works |

### Dependencies

This driver has multilevel dependencies. To compile the driver needs the libdbi and libdbi-drivers packages, which are supported and updated in the OSE forks,`and`should work nicely both on ARM and X86 macOS systems now (tested on macOS 13.3.1 and 12.6.4)

Please do not use the pre-built ones (e.g. 0.9.0 from Homebrew), build from the **master** of the following
{: .notice--info}

* [https://github.com/balabit-deps/libdbi-drivers](https://github.com/balabit-deps/libdbi-drivers)
* [https://github.com/balabit-deps/libdbi](https://github.com/balabit-deps/libdbi)

To use a given database system you need the corresponding supporting system-specific packages as well.&#x20;

Currently, the following databases are supported and tested

<table>
  <thead>
    <tr>
      <th width="178" align="center">Type</th>
      <th width="271">Install</th>
      <th width="156" align="center">Architecture</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">sqlite(3)</td>
      <td>brew install sqlite</td>
      <td align="center">x86/ARM</td>
    </tr>
    <tr>
      <td align="center">PostgreSQL</td>
      <td>brew install postgresql</td>
      <td align="center">x86/ARM</td>
    </tr>
    <tr>
      <td align="center">mySQL</td>
      <td>brew install mysql</td>
      <td align="center">x86/ARM</td>
    </tr>
    <tr>
      <td align="center">Oracle</td>
      <td>
        <a href="https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html">Instant Client Download</a>
      </td>
      <td align="center">x86</td>
    </tr>
  </tbody>
</table>

### Testing

Configuration file used

```config
@version: 4.2
@include "scl.conf"


source s_local0 {
    example-msg-generator(
        num(50)
        freq(1)
        template("Random Message")
    );
};

destination d_sql0 {
    sql(
        type(sqlite3)
        database("test_db")
        table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime varchar (26)", "host varchar(32)",
            "program varchar(32)", "pid varchar(8)", "message varchar(4096)")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid")
    );
};

destination d_sql1 {
    (
        type(mysql)
        host("your_host") port("3306")
        username("test_user") password("your_pass")
        database("test_db")
        table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime varchar (26)", "host varchar(32)",
            "program varchar(32)", "pid varchar(8)", "message varchar(4096)")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid")

        quote_char("``")
    );
};

destination d_sql2 {
    sql(
        type(pgsql)
        host("your_host") port("5432")
        username("test_user") password("your_pass")
        database("test_db")
        table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime varchar (26)", "host varchar(32)",
            "program varchar(32)", "pid varchar(8)", "message varchar(4096)")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid")
    );
};

#
# DO NOT FORGET, no ARM64 Oracle OCCI Client !!!
#
destination d_sql3 {
    sql(
        type(oracle)
        host("your_host") port("1521")
        username("test_user") password("your_pass")
        database("XE")
        table("msgs_${R_YEAR}${R_MONTH}${R_DAY}")
        columns("datetime varchar (26)", "host varchar(32)",
            "program varchar(32)", "pid varchar(8)", "message varchar(4000)")
        values("${R_DATE}", "${HOST}", "${PROGRAM}", "${PID}", "${MSGONLY}")
        indexes("datetime", "host", "program", "pid")
    );
};


log {
    (s_local0);

    destination(d_sql0);
    destination(d_sql1);
    destination(d_sql2);
    destination(d_sql3);

    flags(flow-control);
};
#---------------------------------------------------------------------------

```

#### Proof

<figure><img src="/assets/images/Screenshot 2023-06-05 at 12.00.17 (1).png" alt=""><figcaption><p>sqlite3</p></figcaption></figure>

<figure><img src="/assets/images/Screenshot 2023-06-05 at 12.07.21 (1).png" alt=""><figcaption><p>mySQL</p></figcaption></figure>

<figure><img src="/assets/images/Screenshot 2023-06-05 at 12.08.39 (1).png" alt=""><figcaption><p>PostgreSQL</p></figcaption></figure>

<figure><img src="/assets/images/Screenshot 2023-06-05 at 14.43.43.png" alt=""><figcaption><p>Oracle</p></figcaption></figure>
