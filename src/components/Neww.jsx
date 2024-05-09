import { useState } from "react";
import PropTypes from "prop-types";

const RepoModal = ({ isOpen, onClose, onCreate }) => {
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");

  const handleCreate = () => {
    onCreate(repoName, repoDescription);
    setRepoName("");
    setRepoDescription("");
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className='modal-background' onClick={onClose}></div>
      <div className='modal-content'>
        <div className='box'>
          <h2>Create New Repo</h2>
          <label>
            Repo Name:
            <input
              type='text'
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type='text'
              value={repoDescription}
              onChange={(e) => setRepoDescription(e.target.value)}
            />
          </label>
          <button onClick={handleCreate}>Create Repo</button>
        </div>
      </div>
      <button className='modal-close is-large' onClick={onClose}></button>
    </div>
  );
};

RepoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

const Repo = ({ name, description, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = () => {
    onUpdate(editedName, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className='repo'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type='text'
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <section className='repo-container'>
          <div className='repo-card'>
            <h3>{name}</h3>
            <p>{description}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </section>
      )}
    </div>
  );
};

Repo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Neww = () => {
  const [repos, setRepos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createRepo = (name, description) => {
    setRepos([...repos, { name, description }]);
    setIsModalOpen(false);
  };

  const updateRepo = (index, name, description) => {
    const updatedRepos = [...repos];
    updatedRepos[index] = { name, description };
    setRepos(updatedRepos);
  };

  const deleteRepo = (index) => {
    const updatedRepos = [...repos];
    updatedRepos.splice(index, 1);
    setRepos(updatedRepos);
  };

  return (
    <div>
      <button className='button1' onClick={() => setIsModalOpen(true)}>
        Create New Repository
      </button>
      <RepoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createRepo}
      />
      {repos.map((repo, index) => (
        <Repo
          key={index}
          name={repo.name}
          description={repo.description}
          onUpdate={(name, description) => updateRepo(index, name, description)}
          onDelete={() => deleteRepo(index)}
        />
      ))}
    </div>
  );
};

export default Neww;
