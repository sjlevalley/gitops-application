-- Create todos table for the GitOps application
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);

-- Create trigger for updated_at
CREATE TRIGGER update_todos_updated_at BEFORE UPDATE ON todos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some initial todo data
INSERT INTO todos (title, description, completed) VALUES
('Welcome to GitOps TODO App', 'This is your first todo item. You can edit, complete, or delete it.', false),
('Learn GitOps', 'Understand GitOps principles and best practices', false),
('Set up local development', 'Configure the local development environment with Docker Compose', false)
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL PRIVILEGES ON TABLE todos TO gitops_user;
GRANT ALL PRIVILEGES ON SEQUENCE todos_id_seq TO gitops_user;
