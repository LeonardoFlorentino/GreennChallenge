import { useEffect } from "react";

interface Props {
  setShowCreateModal: (show: boolean) => void;
}

export function OpenCreateProducerModalListener({ setShowCreateModal }: Props) {
  useEffect(() => {
    function handleOpenModal() {
      setShowCreateModal(true);
    }
    window.addEventListener("open-create-producer-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-create-producer-modal", handleOpenModal);
    };
  }, [setShowCreateModal]);
  return null;
}
