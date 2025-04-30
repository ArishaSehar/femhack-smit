// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskCard from './TaskCard';
// import LogoutBtn from './LogoutButton';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// function Dashboard() {
//   const [user, setUser] = useState();
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     assignedTo: ''
//   });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/task`);
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   const addTask = async () => {
//     if (newTask.title.trim() === '' || newTask.description.trim() === '') return;
//     const userId = localStorage.getItem("token");
//     let response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
//     if (response.data) {
//       const user = response.data.find((user) => user.token === userId);
//       if (user) {
//         try {
//           const response = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/task`, {
//             title: newTask.title,
//             description: newTask.description,
//             status: 'To Do',
//             assignedTo: user.email
//           });
//           setNewTask({ title: '', description: '', assignedTo: '' });
//           fetchTasks();
//         } catch (error) {
//           console.error("Error creating task:", error.response ? error.response.data : error.message);
//         }
//         setUser(user);
//       }
//     }
//   };

//   const changeStatus = async (id, newStatus) => {
//     await axios.put(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`, { status: newStatus });
//     fetchTasks();
//   };

//   const deleteTask = async (id) => {
//     await axios.delete(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`);
//     fetchTasks();
//   };

//   return (
//     <div className="p-6 bg-black min-h-screen flex flex-col items-center">
//       <LogoutBtn />
//       <h1 className="text-5xl font-extrabold text-red-500 mb-10 tracking-wider">Task Board</h1>

//       {/* Add task */}
//       <div className="flex flex-col gap-3 mb-10 w-full max-w-md bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl border border-red-600">
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           placeholder="Task Title"
//           className="p-3 rounded-md bg-black text-white border border-red-600 focus:ring-2 focus:ring-red-500"
//         />
//         <textarea
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           placeholder="Task Description"
//           className="p-3 rounded-md bg-black text-white border border-red-600 focus:ring-2 focus:ring-red-500"
//         />
//         <button
//           onClick={addTask}
//           className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
//         >
//           Add Task
//         </button>
//       </div>

//       {/* Task columns with drag-and-drop */}
//       <DragDropContext onDragEnd={() => {}}>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
//           {['To Do', 'In Progress', 'Done'].map((stage) => (
//             <Droppable key={stage} droppableId={stage}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="bg-[#1f1f1f] p-6 rounded-2xl shadow-2xl min-h-[400px] border-2 border-red-600"
//                 >
//                   <h2 className="text-2xl text-center font-bold text-red-400 mb-6 uppercase">{stage}</h2>
//                   {tasks
//                     .filter((task) => task.status === stage)
//                     .map((task, index) => (
//                       <Draggable key={task._id} draggableId={task._id} index={index}>
//                         {(provided) => (
//                           <TaskCard
//                             key={task._id}
//                             task={task}
//                             changeStatus={changeStatus}
//                             deleteTask={deleteTask}
//                             provided={provided}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import LogoutBtn from './LogoutButton';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function Dashboard() {
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/task`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (newTask.title.trim() === '' || newTask.description.trim() === '') return;
    const userId = localStorage.getItem("token");
    let response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
    if (response.data) {
      const user = response.data.find((user) => user.token === userId);
      if (user) {
        try {
          const response = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/task`, {
            title: newTask.title,
            description: newTask.description,
            status: 'To Do',
            assignedTo: user.email
          });
          setNewTask({ title: '', description: '', assignedTo: '' });
          fetchTasks();
        } catch (error) {
          console.error("Error creating task:", error.response ? error.response.data : error.message);
        }
        setUser(user);
      }
    }
  };

  const changeStatus = async (id, newStatus) => {
    await axios.put(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`, { status: newStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`);
    fetchTasks();
  };

  return (
    <div className="p-6 bg-black min-h-screen flex flex-col items-center">
      <LogoutBtn />
      <h1 className="text-5xl font-extrabold text-red-500 mb-10 tracking-wider">Task Board</h1>

      {/* Show only Add Task Button initially */}
      {!showAddTaskForm && (
        <button
          onClick={() => setShowAddTaskForm(true)}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 mb-10"
        >
          Add Task
        </button>
      )}

      {/* Pop-up Add Task Form */}
      {showAddTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="flex flex-col gap-3 w-full max-w-md bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl border border-red-600 relative">
            <button
              onClick={() => setShowAddTaskForm(false)}
              className="absolute top-3 right-3 text-white text-lg font-bold hover:text-red-500"
            >
              ✕
            </button>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Task Title"
              className="p-3 rounded-md bg-black text-white border border-red-600 focus:ring-2 focus:ring-red-500"
            />
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Task Description"
              className="p-3 rounded-md bg-black text-white border border-red-600 focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={() => {
                addTask();
                setShowAddTaskForm(false); // close popup after adding
              }}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* Task columns with drag-and-drop */}
      <DragDropContext onDragEnd={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {['To Do', 'In Progress', 'Done'].map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[#1f1f1f] p-6 rounded-2xl shadow-2xl min-h-[400px] border-2 border-red-600"
                >
                  <h2 className="text-2xl text-center font-bold text-red-400 mb-6 uppercase">{stage}</h2>
                  {tasks
                    .filter((task) => task.status === stage)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            changeStatus={changeStatus}
                            deleteTask={deleteTask}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
