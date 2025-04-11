-- V1__initial_schema.sql
-- Initial database schema for the Timesheet Application

-- #############################################################################
-- # 0. Transaction Control
-- #############################################################################
BEGIN;

-- #############################################################################
-- # 1. Schema Namespace
-- #############################################################################
CREATE SCHEMA IF NOT EXISTS timesheet_app;
SET search_path TO timesheet_app, public;

-- #############################################################################
-- # 2. Extensions
-- #############################################################################
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- #############################################################################
-- # 3. ENUM Types
-- #############################################################################
CREATE TYPE user_role_enum AS ENUM ('admin', 'manager', 'member', 'viewer');
COMMENT ON TYPE user_role_enum IS 'Defines possible roles a user can have globally within the application (in timesheet_app schema).';

CREATE TYPE project_status_enum AS ENUM ('active', 'archived', 'completed', 'on_hold', 'planning');
COMMENT ON TYPE project_status_enum IS 'Defines the lifecycle status of a project (in timesheet_app schema).';

CREATE TYPE task_status_enum AS ENUM ('todo', 'in_progress', 'review', 'done', 'blocked');
COMMENT ON TYPE task_status_enum IS 'Defines the workflow status of a task (in timesheet_app schema).';

CREATE TYPE task_priority_enum AS ENUM ('low', 'medium', 'high');
COMMENT ON TYPE task_priority_enum IS 'Defines the priority levels for tasks (in timesheet_app schema).';

CREATE TYPE project_role_enum AS ENUM ('member', 'manager', 'viewer');
COMMENT ON TYPE project_role_enum IS 'Defines roles a user can have specifically within a project (in timesheet_app schema).';

-- #############################################################################
-- # 4. Utility Functions
-- #############################################################################
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
COMMENT ON FUNCTION trigger_set_timestamp() IS 'Updates the updated_at column to the current timestamp before any update operation on a row (in timesheet_app schema).';

-- #############################################################################
-- # 5. Table Definitions
-- #############################################################################

-- Tabulka Uživatelů (Users)
CREATE TABLE users (
                       user_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                       username VARCHAR(255) UNIQUE NOT NULL,
                       email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password_hash VARCHAR(512) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'member',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verification_token VARCHAR(255) UNIQUE,
    email_verified_at TIMESTAMPTZ,
    is_2fa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    two_factor_recovery_codes_hashed TEXT[],
    password_reset_token VARCHAR(255) UNIQUE,
    password_reset_token_expires_at TIMESTAMPTZ,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(512),
    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    locale VARCHAR(10) NOT NULL DEFAULT 'en-US',
    job_title VARCHAR(255),
    manager_id UUID, -- Self-referencing FK defined later
    default_hourly_rate DECIMAL(10, 2) CHECK (default_hourly_rate IS NULL OR default_hourly_rate >= 0),
    last_login_at TIMESTAMPTZ,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE users IS 'Stores user account information, credentials, and personal settings (in timesheet_app schema).';
COMMENT ON COLUMN users.user_id IS 'Primary key for the user.';
COMMENT ON COLUMN users.username IS 'Unique username for login.';
COMMENT ON COLUMN users.email IS 'Unique email address for login and notifications.';
COMMENT ON COLUMN users.password_hash IS 'Hashed user password (use strong hashing like Argon2 or bcrypt in application).';
COMMENT ON COLUMN users.role IS 'Global role of the user within the application.';
COMMENT ON COLUMN users.is_active IS 'Indicates if the user account is active and can log in.';
COMMENT ON COLUMN users.is_email_verified IS 'Indicates if the user has verified their email address.';
COMMENT ON COLUMN users.email_verification_token IS 'Token used for verifying the email address.';
COMMENT ON COLUMN users.email_verified_at IS 'Timestamp when the email address was verified.';
COMMENT ON COLUMN users.is_2fa_enabled IS 'Indicates if Two-Factor Authentication is enabled for the user.';
COMMENT ON COLUMN users.two_factor_secret IS 'Encrypted secret key for 2FA code generation (encryption handled by application).';
COMMENT ON COLUMN users.two_factor_recovery_codes_hashed IS 'Array of hashed recovery codes for 2FA.';
COMMENT ON COLUMN users.password_reset_token IS 'Token used for the password reset process.';
COMMENT ON COLUMN users.password_reset_token_expires_at IS 'Expiration timestamp for the password reset token.';
COMMENT ON COLUMN users.first_name IS 'User''s first name.';
COMMENT ON COLUMN users.last_name IS 'User''s last name.';
COMMENT ON COLUMN users.avatar_url IS 'URL to the user''s profile picture.';
COMMENT ON COLUMN users.timezone IS 'User''s preferred timezone (e.g., ''Europe/Prague'').';
COMMENT ON COLUMN users.locale IS 'User''s preferred locale for language and formatting (e.g., ''cs-CZ'').';
COMMENT ON COLUMN users.job_title IS 'User''s job title or position.';
COMMENT ON COLUMN users.manager_id IS 'FK to the user (manager). Defined via ALTER TABLE later.';
COMMENT ON COLUMN users.default_hourly_rate IS 'Default hourly rate for the user, used if not specified otherwise.';
COMMENT ON COLUMN users.last_login_at IS 'Timestamp of the user''s last successful login.';
COMMENT ON COLUMN users.last_login_ip IS 'IP address from which the user last logged in.';
COMMENT ON COLUMN users.created_at IS 'Timestamp when the user account was created.';
COMMENT ON COLUMN users.updated_at IS 'Timestamp when the user account was last updated.';

-- Tabulka Klientů (Clients)
CREATE TABLE clients (
                         client_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                         name VARCHAR(255) UNIQUE NOT NULL,
                         contact_person VARCHAR(255),
                         email VARCHAR(255) UNIQUE CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    phone VARCHAR(50),
    address TEXT,
    vat_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE clients IS 'Stores information about clients (in timesheet_app schema).';
COMMENT ON COLUMN clients.client_id IS 'Primary key for the client.';
COMMENT ON COLUMN clients.name IS 'Unique name of the client company or individual.';
COMMENT ON COLUMN clients.contact_person IS 'Name of the primary contact person at the client.';
COMMENT ON COLUMN clients.email IS 'Contact email address for the client.';
COMMENT ON COLUMN clients.phone IS 'Contact phone number for the client.';
COMMENT ON COLUMN clients.address IS 'Physical or mailing address of the client.';
COMMENT ON COLUMN clients.vat_id IS 'Value Added Tax identification number (e.g., IČ DPH in CZ).';
COMMENT ON COLUMN clients.created_at IS 'Timestamp when the client record was created.';
COMMENT ON COLUMN clients.updated_at IS 'Timestamp when the client record was last updated.';

-- Tabulka Štítků (Tags)
CREATE TABLE tags (
                      tag_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                      name VARCHAR(100) UNIQUE NOT NULL,
                      color VARCHAR(7) CHECK (color IS NULL OR color ~ '^#[A-Fa-f0-9]{6}$'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE tags IS 'Stores tags for categorizing tasks (in timesheet_app schema).';
COMMENT ON COLUMN tags.tag_id IS 'Primary key for the tag.';
COMMENT ON COLUMN tags.name IS 'Unique name of the tag.';
COMMENT ON COLUMN tags.color IS 'Hex color code for visual representation of the tag (e.g., #FF5733).';
COMMENT ON COLUMN tags.created_at IS 'Timestamp when the tag was created.';
COMMENT ON COLUMN tags.updated_at IS 'Timestamp when the tag was last updated.';

-- Tabulka Projektů (Projects)
CREATE TABLE projects (
                          project_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                          project_code VARCHAR(50) UNIQUE,
                          client_id UUID,
                          project_manager_id UUID,
                          name VARCHAR(255) NOT NULL,
                          description TEXT,
                          status project_status_enum NOT NULL DEFAULT 'planning',
                          start_date DATE,
                          end_date DATE,
                          budget_hours DECIMAL(10, 2) CHECK (budget_hours IS NULL OR budget_hours >= 0),
                          is_billable BOOLEAN NOT NULL DEFAULT TRUE,
                          created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT fk_client FOREIGN KEY(client_id) REFERENCES clients(client_id) ON DELETE SET NULL,
                          CONSTRAINT fk_project_manager FOREIGN KEY(project_manager_id) REFERENCES users(user_id) ON DELETE SET NULL,
                          CHECK (start_date IS NULL OR end_date IS NULL OR end_date >= start_date)
);
COMMENT ON TABLE projects IS 'Stores information about individual projects (in timesheet_app schema).';
COMMENT ON COLUMN projects.project_id IS 'Primary key for the project.';
COMMENT ON COLUMN projects.project_code IS 'Short unique code for easy project reference.';
COMMENT ON COLUMN projects.client_id IS 'FK linking the project to a client.';
COMMENT ON COLUMN projects.project_manager_id IS 'FK linking the project to the responsible user (manager).';
COMMENT ON COLUMN projects.name IS 'Name of the project.';
COMMENT ON COLUMN projects.description IS 'Detailed description of the project.';
COMMENT ON COLUMN projects.status IS 'Current status of the project.';
COMMENT ON COLUMN projects.start_date IS 'Planned or actual start date of the project.';
COMMENT ON COLUMN projects.end_date IS 'Planned or actual end date of the project.';
COMMENT ON COLUMN projects.budget_hours IS 'Estimated or allocated budget in hours for the project.';
COMMENT ON COLUMN projects.is_billable IS 'Indicates if work on this project is generally billable.';
COMMENT ON COLUMN projects.created_at IS 'Timestamp when the project was created.';
COMMENT ON COLUMN projects.updated_at IS 'Timestamp when the project was last updated.';

-- Tabulka Úkolů (Tasks)
CREATE TABLE tasks (
                       task_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                       project_id UUID NOT NULL,
                       creator_id UUID NOT NULL,
                       assignee_id UUID,
                       parent_task_id UUID,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       status task_status_enum NOT NULL DEFAULT 'todo',
                       priority task_priority_enum,
                       due_date DATE,
                       estimated_hours DECIMAL(8, 2) CHECK (estimated_hours IS NULL OR estimated_hours >= 0),
                       completed_at TIMESTAMPTZ,
                       created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT fk_project FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
                       CONSTRAINT fk_creator FOREIGN KEY(creator_id) REFERENCES users(user_id) ON DELETE RESTRICT,
                       CONSTRAINT fk_assignee FOREIGN KEY(assignee_id) REFERENCES users(user_id) ON DELETE SET NULL,
                       CONSTRAINT fk_parent_task FOREIGN KEY(parent_task_id) REFERENCES tasks(task_id) ON DELETE SET NULL,
                       CHECK (task_id <> parent_task_id)
);
COMMENT ON TABLE tasks IS 'Stores individual tasks within projects (in timesheet_app schema).';
COMMENT ON COLUMN tasks.task_id IS 'Primary key for the task.';
COMMENT ON COLUMN tasks.project_id IS 'FK linking the task to a project.';
COMMENT ON COLUMN tasks.creator_id IS 'FK linking the task to the user who created it.';
COMMENT ON COLUMN tasks.assignee_id IS 'FK linking the task to the user responsible for completing it.';
COMMENT ON COLUMN tasks.parent_task_id IS 'FK for creating hierarchical task structures (subtasks).';
COMMENT ON COLUMN tasks.title IS 'Title or summary of the task.';
COMMENT ON COLUMN tasks.description IS 'Detailed description of the task.';
COMMENT ON COLUMN tasks.status IS 'Current workflow status of the task.';
COMMENT ON COLUMN tasks.priority IS 'Priority level of the task.';
COMMENT ON COLUMN tasks.due_date IS 'Deadline for the task completion.';
COMMENT ON COLUMN tasks.estimated_hours IS 'Estimated time required to complete the task.';
COMMENT ON COLUMN tasks.completed_at IS 'Timestamp when the task was marked as completed.';
COMMENT ON COLUMN tasks.created_at IS 'Timestamp when the task was created.';
COMMENT ON COLUMN tasks.updated_at IS 'Timestamp when the task was last updated.';

-- Tabulka Časových Záznamů (Time Entries)
CREATE TABLE time_entries (
                              time_entry_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                              user_id UUID NOT NULL,
                              task_id UUID NOT NULL,
                              project_id UUID NOT NULL, -- Denormalized FK
                              entry_date DATE NOT NULL,
                              duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
                              notes TEXT,
                              is_billable BOOLEAN NOT NULL DEFAULT TRUE,
                              approved_at TIMESTAMPTZ,
                              approver_id UUID,
                              created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE RESTRICT,
                              CONSTRAINT fk_task FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
                              CONSTRAINT fk_project_denormalized FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
                              CONSTRAINT fk_approver FOREIGN KEY(approver_id) REFERENCES users(user_id) ON DELETE SET NULL,
                              CHECK ((approved_at IS NOT NULL AND approver_id IS NOT NULL) OR (approved_at IS NULL))
);
COMMENT ON TABLE time_entries IS 'Stores individual time log entries related to tasks (in timesheet_app schema).';
COMMENT ON COLUMN time_entries.time_entry_id IS 'Primary key for the time entry.';
COMMENT ON COLUMN time_entries.user_id IS 'FK linking the time entry to the user who logged the time.';
COMMENT ON COLUMN time_entries.task_id IS 'FK linking the time entry to a specific task.';
COMMENT ON COLUMN time_entries.project_id IS 'Denormalized FK to the project for simplified reporting (should match task''s project).';
COMMENT ON COLUMN time_entries.entry_date IS 'Date for which the time was logged.';
COMMENT ON COLUMN time_entries.duration_minutes IS 'Duration of the logged time in minutes.';
COMMENT ON COLUMN time_entries.notes IS 'Optional notes or description for the time entry.';
COMMENT ON COLUMN time_entries.is_billable IS 'Indicates if this specific time entry is billable (may override project/task default).';
COMMENT ON COLUMN time_entries.approved_at IS 'Timestamp when the time entry was approved.';
COMMENT ON COLUMN time_entries.approver_id IS 'FK linking the time entry to the user who approved it.';
COMMENT ON COLUMN time_entries.created_at IS 'Timestamp when the time entry was created.';
COMMENT ON COLUMN time_entries.updated_at IS 'Timestamp when the time entry was last updated.';

-- Spojovací Tabulka Členství v Projektu (Project Memberships)
CREATE TABLE project_memberships (
                                     project_membership_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                                     user_id UUID NOT NULL,
                                     project_id UUID NOT NULL,
                                     role project_role_enum NOT NULL DEFAULT 'member',
                                     joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                     CONSTRAINT fk_user_membership FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                     CONSTRAINT fk_project_membership FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
                                     UNIQUE (user_id, project_id)
);
COMMENT ON TABLE project_memberships IS 'Junction table linking users to projects and defining their role within that project (in timesheet_app schema).';
COMMENT ON COLUMN project_memberships.project_membership_id IS 'Primary key for the membership record.';
COMMENT ON COLUMN project_memberships.user_id IS 'FK to the user who is a member of the project.';
COMMENT ON COLUMN project_memberships.project_id IS 'FK to the project.';
COMMENT ON COLUMN project_memberships.role IS 'Role of the user within the specific project (e.g., member, manager).';
COMMENT ON COLUMN project_memberships.joined_at IS 'Timestamp when the user was added to the project.';

-- Spojovací Tabulka Štítků Úkolů (Task Tags)
CREATE TABLE task_tags (
                           task_tag_id UUID PRIMARY KEY DEFAULT public.uuid_generate_v4(),
                           task_id UUID NOT NULL,
                           tag_id UUID NOT NULL,
                           CONSTRAINT fk_task_tag FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
                           CONSTRAINT fk_tag_task FOREIGN KEY(tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE,
                           UNIQUE (task_id, tag_id)
);
COMMENT ON TABLE task_tags IS 'Junction table linking tasks to tags (in timesheet_app schema).';
COMMENT ON COLUMN task_tags.task_tag_id IS 'Primary key for the task-tag association.';
COMMENT ON COLUMN task_tags.task_id IS 'FK to the task.';
COMMENT ON COLUMN task_tags.tag_id IS 'FK to the tag.';

-- #############################################################################
-- # 6. Triggers (for updated_at automation)
-- #############################################################################
CREATE TRIGGER set_users_timestamp BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_clients_timestamp BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_tags_timestamp BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_projects_timestamp BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_tasks_timestamp BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
CREATE TRIGGER set_time_entries_timestamp BEFORE UPDATE ON time_entries FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- #############################################################################
-- # 7. Foreign Keys (defined post-creation if needed)
-- #############################################################################
ALTER TABLE users ADD CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES users(user_id) ON DELETE SET NULL;
COMMENT ON CONSTRAINT fk_manager ON users IS 'Links user to their manager within the users table.';

-- #############################################################################
-- # 8. Indexes (for performance)
-- #############################################################################
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_manager_id ON users(manager_id);

-- Clients
CREATE INDEX idx_clients_name ON clients(name text_pattern_ops);

-- Projects
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_project_manager_id ON projects(project_manager_id);
CREATE INDEX idx_projects_status ON projects(status);

-- Tasks
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_parent_task_id ON tasks(parent_task_id);

-- Time Entries
CREATE INDEX idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX idx_time_entries_task_id ON time_entries(task_id);
CREATE INDEX idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX idx_time_entries_entry_date ON time_entries(entry_date);
CREATE INDEX idx_time_entries_approver_id ON time_entries(approver_id);

-- #############################################################################
-- # 9. Security Considerations (IMPORTANT - Separate Process Required)
-- #############################################################################
-- This schema defines the database objects within the 'timesheet_app' schema.
-- However, managing database roles and permissions is a CRITICAL and SEPARATE process.
-- DO NOT run your application using a PostgreSQL superuser (like 'postgres').
--
-- You MUST:
-- 1. Create a dedicated database role (user) for your application.
-- 2. Grant MINIMAL necessary privileges to this role:
--    - CONNECT to the database.
--    - USAGE on the 'timesheet_app' schema.
--    - SELECT, INSERT, UPDATE, DELETE permissions ONLY on the tables the application needs to modify.
--    - Potentially USAGE on sequences if using SERIAL types.
--    - Set DEFAULT PRIVILEGES so the role can access objects created later by migrations.
--
-- This setup significantly reduces the potential damage if application credentials are compromised.
-- Consult PostgreSQL documentation on CREATE ROLE, GRANT, and ALTER DEFAULT PRIVILEGES.
-- Implement this security setup using separate scripts or infrastructure management tools.

-- #############################################################################
-- # 10. Commit Transaction
-- #############################################################################
COMMIT;