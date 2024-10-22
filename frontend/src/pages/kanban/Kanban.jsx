import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../../components/TaskCards";

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String!) {
    addTask(title: $title, description: $description) {
      id
      title
      description
      status
    }
  }
`;

const REMOVE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTask($id: ID!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      status
    }
  }
`;

const statusMapping = {
  pending: "pendente",
  in_progress: "em progresso",
  completed: "concluída",
};

const statuses = Object.keys(statusMapping);

function Kanban() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/");
    }
  }, [navigate]);

  const { loading, error, data } = useQuery(GET_TASKS);
  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const [removeTask] = useMutation(REMOVE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleRemoveTask = (id) => {
    removeTask({ variables: { id } });
  };

  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "pending",
    };

    addTask({
      variables: { title, description },
      optimisticResponse: {
        addTask: newTask,
      },
      update: (cache, { data: { addTask } }) => {
        cache.modify({
          fields: {
            tasks(existingTasks = []) {
              const newTaskRef = cache.writeFragment({
                data: addTask,
                fragment: gql`
                  fragment NewTask on Task {
                    id
                    title
                    description
                    status
                  }
                `,
              });
              return [...existingTasks, newTaskRef];
            },
          },
        });
      },
    });

    setTitle("");
    setDescription("");
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const draggedTask = data.tasks.find((task) => task.id === draggableId);

    if (draggedTask && draggedTask.status !== destination.droppableId) {
      updateTaskStatus({
        variables: { id: draggableId, status: destination.droppableId },
        optimisticResponse: {
          updateTask: {
            id: draggableId,
            status: destination.droppableId,
            __typename: "Task",
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ id: draggableId, __typename: "Task" }),
            fields: {
              status(existingStatus) {
                return destination.droppableId;
              },
            },
          });
        },
      });
    }
  };

  const tasksByStatus = (status) =>
    data?.tasks ? data.tasks.filter((task) => task.status === status) : [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box width={"100vw"} height={"100vh"} p={5}>
      <Heading mb={4}>Kanban de Tarefas</Heading>
      <Stack direction="row" mb={6}>
        <Input
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          onClick={handleAddTask}
          colorScheme="teal"
          size="lg"
          width={"md"}
        >
          Adicionar Tarefa
        </Button>
      </Stack>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack direction="row" spacing={4}>
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  border="1px solid lightgray"
                  borderRadius="md"
                  p={4}
                  width="300px"
                  minHeight="400px"
                  bg="gray.50"
                >
                  <Heading size="md" mb={4} textTransform="capitalize">
                    {statusMapping[status]}
                  </Heading>
                  {tasksByStatus(status).map((task, taskIndex) => (
                    <Draggable
                      draggableId={task.id}
                      index={taskIndex}
                      key={task.id}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          mb={4}
                          p={4}
                          bg="white"
                          borderRadius="md"
                          boxShadow="md"
                        >
                          <TaskCard
                            task={task}
                            statusMapping={statusMapping}
                            onRemove={handleRemoveTask}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Stack>
      </DragDropContext>
    </Box>
  );
}

export default Kanban;
