const BASE_URL = `${import.meta.env.VITE_API_URL}/producers`;

function mapProducer(raw: any) {
  if (!raw || typeof raw !== "object") return raw;

  return {
    ...raw,
    imageUrl: raw.imageUrl ?? raw.image_url ?? "",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
    direct_skyrocketing_sales: raw.direct_skyrocketing_sales ?? false,
    indirect_skyrocketing_sales: raw.indirect_skyrocketing_sales ?? false,
  };
}

export const producerService = {
  async getAll() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtores");
    }

    const data = await response.json();
    return Array.isArray(data) ? data.map(mapProducer) : data;
  },

  async getById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtor");
    }

    const data = await response.json();
    return mapProducer(data);
  },

  async create(payload: any) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar produtor");
    }

    const createdProducer = await response.json();
    return mapProducer(createdProducer);
  },

  async update(id: number, payload: any) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar produtor");
    }

    const updatedProducer = await response.json();
    return mapProducer(updatedProducer);
  },

  async delete(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar produtor");
    }

    return true;
  },
};
