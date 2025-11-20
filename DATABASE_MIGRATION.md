# Database Migration: Add `is_deal` Field

## Step 1: Add Column to Supabase Database

You need to add the `is_deal` column to your `phones` table in Supabase.

### Option A: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor** → **phones** table
3. Click **Add Column** or use the **+** button
4. Configure the new column:
   - **Name**: `is_deal`
   - **Type**: `boolean`
   - **Default Value**: `false`
   - **Nullable**: No (unchecked)
5. Click **Save**

### Option B: Using SQL Editor

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run this SQL command:

```sql
ALTER TABLE phones 
ADD COLUMN is_deal BOOLEAN NOT NULL DEFAULT false;
```

## Step 2: Verify the Column

After adding the column, verify it exists:

```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'phones' AND column_name = 'is_deal';
```

## Step 3: Mark Existing Phones as Deals (Optional)

If you want to mark some existing phones as deals, you can update them:

```sql
-- Mark specific phones as deals by ID
UPDATE phones 
SET is_deal = true 
WHERE id IN ('phone-id-1', 'phone-id-2', 'phone-id-3');

-- Or mark phones by condition
UPDATE phones 
SET is_deal = true 
WHERE condition = 'Excellent' AND price < 20000;

-- Or mark the newest phones
UPDATE phones 
SET is_deal = true 
WHERE created_at >= NOW() - INTERVAL '7 days';
```

## Step 4: Test the API

After adding the column, test the API endpoint:

```bash
# Get all phones
curl http://localhost:8000/phones?available_only=true

# Get only deals
curl http://localhost:8000/phones?available_only=true&deals_only=true
```

## Notes

- The `is_deal` field defaults to `false` for all existing phones
- Only phones with `is_deal = true` will appear in the "Today's Deals" section
- You can update phones to be deals through the admin panel (when re-enabled) or directly in the database

