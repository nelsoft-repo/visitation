ALTER TABLE visitation.customers 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_customers_is_admin ON visitation.customers(is_admin);
