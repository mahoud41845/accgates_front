import React from "react";

function AccountSelect({ accounts, selectedValue, onChange, placeholder }) {
  return (
    <select value={selectedValue} onChange={onChange} className="droplist-acc">
      <option value="">{placeholder || "Select Account"}</option>
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.account_number} - {account.account_name}
          </option>
        ))
      ) : (
        <option disabled>No accounts available</option>
      )}
    </select>
  );
}

export default AccountSelect;
