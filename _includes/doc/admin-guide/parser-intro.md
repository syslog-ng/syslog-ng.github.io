The messages of these devices often do not completely comply with the
syslog RFCs, making them difficult to parse. The {{ page.parser }}-parser() of
syslog-ng OSE solves this problem, and can separate these log messages
to name-value pairs, extracting also the Cisco-specific values, for
example, the mnemonic. For details on using value-pairs in syslog-ng OSE
see [[Structuring macros, metadata, and other value-pairs]].
