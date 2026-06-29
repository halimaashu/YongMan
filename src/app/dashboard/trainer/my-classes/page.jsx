import TrainerClassDashboard from "@/components/admin/trainer/TrainerClassDashboard";
import { FetchServer } from "@/lib/actions/core/mutation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const TrainerOwmClassPage = async () => {
  const userSession = await auth.api.getSession({
    headers: await headers(),
  });

  const user = userSession?.user;

  // Fetch class arrays safely based on user context identity
  const myClass = await FetchServer(`/api/myClass?userId=${user?.id}`);
  
  // Ensure we safely map fallback array if endpoint meets database error or missing sets
  const safeClasses = Array.isArray(myClass) ? myClass : [];

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            My Class Pages
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Welcome back, {user?.name || "Trainer"}. Manage your classes and track student metrics.
          </p>
        </div>

        {/* HeroUI Render Area */}
        <TrainerClassDashboard classes={safeClasses} />
      </div>
    </div>
  );
};

export default TrainerOwmClassPage;