export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">

      <h1 className="text-4xl font-bold">
        Smart Hostel Complaint System
      </h1>

      <p className="text-lg">
        Select Dashboard
      </p>

      <div className="flex gap-6">

        <a href="/student">
          <button className="px-6 py-3 bg-blue-500 text-white rounded">
            Student
          </button>
        </a>

        <a href="/admin">
          <button className="px-6 py-3 bg-green-500 text-white rounded">
            Admin
          </button>
        </a>

        <a href="/staff">
          <button className="px-6 py-3 bg-purple-500 text-white rounded">
            Staff
          </button>
        </a>

      </div>

    </div>
  );
}