import React, { useState } from "react";

type Transaction = {
  id: number;
  type: "Deposit" | "Withdraw" | "Transfer";
  amount: number;
  sender: string;
  receiver: string;
  status: "Completed" | "Pending";
};

const PaymentDashboard: React.FC = () => {
  const [wallet, setWallet] = useState(5420.75);
  const [mode, setMode] = useState<"deposit" | "withdraw" | "transfer">(
    "transfer"
  );
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "Transfer",
      amount: 500,
      sender: "Investor John",
      receiver: "Entrepreneur Jane",
      status: "Completed",
    },
  ]);

  const addTransaction = (tx: Transaction) =>
    setTransactions(prev => [tx, ...prev]);

  const handleDeposit = () => {
    if (amount <= 0) return;
    setWallet(w => w + amount);
    addTransaction({
      id: Date.now(),
      type: "Deposit",
      amount,
      sender: "Bank",
      receiver: "My Wallet",
      status: "Completed",
    });
    setAmount(0);
  };

  const handleWithdraw = () => {
    if (amount <= 0 || amount > wallet) return;
    setWallet(w => w - amount);
    addTransaction({
      id: Date.now(),
      type: "Withdraw",
      amount,
      sender: "My Wallet",
      receiver: "Bank",
      status: "Completed",
    });
    setAmount(0);
  };

  const handleTransfer = () => {
    if (amount <= 0 || amount > wallet || !receiver) return;
    setWallet(w => w - amount);
    addTransaction({
      id: Date.now(),
      type: "Transfer",
      amount,
      sender: "Investor John",
      receiver,
      status: "Completed",
    });
    setAmount(0);
    setReceiver("");
  };

  const exportCSV = () => {
    const headers = "Type,Amount,Sender,Receiver,Status\n";
    const rows = transactions
      .map(
        t =>
          `${t.type},${t.amount},${t.sender},${t.receiver},${t.status}`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment System</h1>
        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export Transactions
        </button>
      </div>

      {/* WALLET CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Wallet Balance" value={`$${wallet.toFixed(2)}`} />
        <Card title="Total Received" value="$2050.00" />
        <Card title="Total Sent" value="$570.50" />
        <Card title="Active Transactions" value={transactions.length} />
      </div>

      {/* PAYMENT SECTION */}
      <div className="bg-white p-6 rounded shadow mb-8">
        {/* Tabs */}
        <div className="flex bg-gray-100 rounded mb-6 overflow-hidden">
          {["deposit", "withdraw", "transfer"].map(tab => (
            <button
              key={tab}
              onClick={() => setMode(tab as any)}
              className={`flex-1 py-2 font-medium transition
                ${
                  mode === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={e => setAmount(+e.target.value)}
            className="border p-2 rounded w-full"
          />

          {mode === "transfer" && (
            <select
              value={receiver}
              onChange={e => setReceiver(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Entrepreneur</option>
              <option value="Entrepreneur Jane">Entrepreneur Jane</option>
              <option value="Startup Alex">Startup Alex</option>
            </select>
          )}

          {mode === "deposit" && (
            <button
              onClick={handleDeposit}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Deposit Funds
            </button>
          )}

          {mode === "withdraw" && (
            <button
              onClick={handleWithdraw}
              className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
            >
              Withdraw Funds
            </button>
          )}

          {mode === "transfer" && (
            <button
              onClick={handleTransfer}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Transfer (Investor → Entrepreneur)
            </button>
          )}
        </div>
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Transaction History</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Type</th>
              <th>Amount</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b">
                <td className="py-2">{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{tx.sender}</td>
                <td>{tx.receiver}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs
                      ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: any }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default PaymentDashboard;
