import Repository from "@/components/Repository";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchRepositories } from "@/services/api/api";
import React, { useState } from "react";
import { Repositories, SelectedRepo } from "@/utils/types";
import RepositorySkeleton from "@/components/RepositorySkleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ChartModal from "@/components/ChartModal";

const SearchUserProfile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<Repositories[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<SelectedRepo>({
    name: "",
    fullName: "",
  });

  const [showResult , setShowResult] = useState<boolean>(false);

  const searchUsername = async () => {
    setLoading(true);
    setError(false);
    setShowResult(true)
    if (!username.trim()) {
      setLoading(false);
      setError(true);
      return;
    }
    const data: Repositories[] | null = await fetchRepositories(
      username.trim()
    );
    if (!data|| data.length < 0) {
      setLoading(false);
      setError(true);
      return;
    }
   
    setLoading(false);
    setRepositories(data);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setSelectedRepo({ name: "", fullName: "" });
  };

  const openModal = (fullName: string, name: string) => {
    setSelectedRepo({ name, fullName });
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold mt-10 whitespace-nowrap ">Enter GitHub Username </h1>
        {error && (
          <Alert variant="destructive" className="w-full max-w-sm mt-5">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alert</AlertTitle>
            <AlertDescription>
              Please Enter a valid GitHub username to search for repositories.
            </AlertDescription>
          </Alert>
        )}
        <div className="flex w-full max-w-sm  my-10  items-center space-x-2">
          <Input
            type="text"
            className="shadow-lg"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchUsername()}
          />
          <Button onClick={searchUsername} disabled={loading}>
            Search
          </Button>
        </div>

    { showResult &&  <div className="grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3 w-full">
          {loading ? (
            Array(14)
              .fill(0)
              .map((value, index) => <RepositorySkeleton key={value?index:index} />)
          ) : repositories.length > 0 ? (
            repositories.map((repo) => (
              <Repository
                key={repo.id}
                name={repo.name}
                full_name={repo.full_name}
                viewCommits={openModal}
              />
            ))
          ) : (
            <p className="py-4 font-bold text-center w-full col-span-7">
              No Repository Found
            </p>
          )}
        </div>}
      </div>
      {isOpen && <ChartModal onClose={onCloseModal} repo={selectedRepo} />}
    </>
  );
};

export default SearchUserProfile;
