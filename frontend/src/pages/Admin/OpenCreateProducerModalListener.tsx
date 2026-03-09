import { useEffect } from "react";

interface Props {
  setShowCreateModal: (show: boolean) => void;
}

export function OpenCreateProducerModalListener({ setShowCreateModal }: Props) {
  useEffect(() => {
    // Abrir modal automaticamente se sinalizado no localStorage
    if (localStorage.getItem("openCreateProducerModal") === "1") {
      setShowCreateModal(true);
      localStorage.removeItem("openCreateProducerModal");
    }
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
