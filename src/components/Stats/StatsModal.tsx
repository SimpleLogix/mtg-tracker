import Modal from "../AddGameModalScreen/Modal";

interface StatsModalProps {
  onClose: () => void;
}

export default function StatsModal({ onClose }: StatsModalProps) {
  return (
    <Modal onClose={onClose}>
      <div>Stats</div>
    </Modal>
  );
}
