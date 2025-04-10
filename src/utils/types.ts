export type Repositories = {
  name: string;
  id?: number;
  viewCommits?: (full_name: string, name: string) => void;
  full_name: string;
};

export type Modal = {
  onClose: () => void;
  repo: SelectedRepo;
};
export type SelectedRepo = {
  name: string;
  fullName: string;
};

export type Commits = {
  date: string;
  count: number;
};

export type fetchCommits = {
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
};

export type DateCommitCount = {
  [date: string]: number;
};
