import { makeRequest } from "./common";

const findByAuthorId = async (userId) => {
  const params = new URLSearchParams({ userId, _sort: "-createdAt" });
  const notes = await makeRequest({ endpoint: `notes?${params.toString()}` });

  return notes;
};

const create = async (title, body, userId) => {
  const data = {
    id: Math.random().toString(36).slice(2),
    title,
    body,
    createdAt: new Date().toISOString(),
    userId,
  };

  const result = await makeRequest({
    endpoint: "notes",
    method: "POST",
    body: data,
  });

  return result;
};

const remove = async (id) => {
  const result = await makeRequest({
    endpoint: `notes/${id}`,
    method: "DELETE",
  });

  return result;
};

const update = async (id, body) => {
  const result = await makeRequest({
    endpoint: `notes/${id}`,
    method: "PATCH",
    body,
  });

  return result;
};

export const notes = {
  findByAuthorId,
  create,
  remove,
  update,
};
