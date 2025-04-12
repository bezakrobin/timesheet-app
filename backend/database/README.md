# Příprava DB pro první spojení

```SQL
CREATE DATABASE timesheet_db;
```

```SQL
CREATE USER timesheet_user WITH PASSWORD 'silne_heslo_123';
```

```SQL
GRANT ALL PRIVILEGES ON DATABASE timesheet_db TO timesheet_user;
```