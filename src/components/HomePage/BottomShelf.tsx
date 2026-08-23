interface BottomHomeShelfProps {
  setOpenAddGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isUserEditing: boolean;
}

export default function BottomHomeShelf({
  setOpenAddGameModal,
  setIsUserEditing,
  isUserEditing,
}: BottomHomeShelfProps) {
  return (
    <section className="bottom-shelf">
      <button onClick={() => setOpenAddGameModal(true)}>
        <span className="material-symbols-outlined">edit_square</span>
      </button>
      <button>
        <span className="material-symbols-outlined">bar_chart</span>
      </button>
      <button
        onClick={() => {
          setIsUserEditing(!isUserEditing);
        }}
      >
        <span className="material-symbols-outlined">Delete</span>
      </button>
    </section>
  );
}
