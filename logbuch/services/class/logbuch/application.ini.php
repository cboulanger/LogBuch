;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Leave the above line to make sure nobody can access this file ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[database]

;; database.type
;; the database type. currently, only mysql is supported and tested. Since
;; the PDO abstraction layer is used, it will be easy to support other backends.
type = mysql

;; database.host
;; the database host, usually localhost
host = localhost

;; database.port
;; the port on which the database listens for requests, ususally 3306
port = 3306

;; database.username and database.userpassw
;; The name and password of the user which is used to do normal database insertion
;; and update tasks. The user should not be allowed to create, alter or delete tables.
;; Currently, use the same user for both access types.
username  = logbuch
userpassw = logbuch
adminname  = logbuch
adminpassw = logbuch

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information.
admindb = logbuch_devel_admin

;; database.userdb
;; The name of the databases that contains the user data.
;; Can be the same as database.admindb, but if you have access
;; to more than one database, is recommended to keep a separate
;; database for this.
userdb = logbuch_devel_user

;; database.tmpdb
;; The name of the database holding all the tables with temporary data.
;; Can be the same as database.admindb, but if you have access
;; to more than one database, is recommended to keep a separate
;; database for this.
tmp_db = logbuch_devel_tmp

;; database.tableprefix
;; A global prefix for all tables that are created, which makes
;; it possible to keep the data of several applications in one
;; database. you can omit this if no prefix is needed.
tableprefix =

;; database.encoding
;; The default encoding scheme of the database. It is recommended
;; to use the default utf8.
encoding  = utf8

;; the name of the default datasource 
default_datasource_name = demo

[service]

;; service.event_transport
;; Whether the server response should contain messages and events
;; for the qooxdoo application
;; values are on/off
event_transport = on

[access]
;; whether users are attached to roles directly ("yes") or have roles
;; dependent on the group they belong to ("no"), i.e. users can have
;; different roles in different groups. You can still define global
;; roles when using group-specific roles. On the other hand, if you set this
;; value to "yes", group-specific roles will be ignored.
global_roles_only = no

;; whether authentication should be possible only via https.
;; this option gets set as a read-only configuration value
;; (access.enforce_https_login) also which is available on the
;; client.
enforce_https_login = no

[email]

;; The email address of the administrator of this particular installation
admin = "info@bibliograph.org"

;; The email address of the developer of the application
developer = "info@bibliograph.org"

[ldap]
;; whether ldap authentication is enabled, values: yes/no
enabled = no

;; whether to use ldap groups. values yes/no
use_groups = yes

;; the host of the ldap server
host = s2.rewi.hu-berlin.de

;; the port listening for ldap connections
port = 389

;; base dn to which the user name is added for authentication
user_base_dn = ""

;; attribute name that is used for the user name, usually uid.
user_id_attr = uid

;; base dn of group data
group_base_dn = ""

;; attribute for members of the group
member_id_attr = memberUid

;; attribute for the group name, usually description or displayName
group_name_attr = description

;; if the LDAP database only stores the user name part of the users'
;; e-mail address, you can provide the domain part here
mail_domain = ""

;; ================================================================
;; Don't touch anything beyond this point
;; ================================================================

[macros]

;; DSN information. Since the ";" character cannot be used in value
;; definitions, it is replaced by "&" in the the dsn string.
dsn_user = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.userdb}"
dsn_admin = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
dsn_tmp = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.tmp_db}"

;; ================================================================
;; End
;; ================================================================