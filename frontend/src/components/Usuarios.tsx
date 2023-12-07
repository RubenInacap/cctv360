import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get_users, delete_user } from "../api/user";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { User } from "../Interfaces";


interface Props {
  results: any;
};

const Usuarios = ({ results }: Props) => {

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: get_users,
  })


  const deleteUserMut = useMutation({
    mutationFn: delete_user,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Usuario Eliminado!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  if (isError) return toast.error("Error!")
  if (isLoading) return <Loader />
  if (deleteUserMut.isLoading) return <Loader />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Usuario ID
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              UserName
            </th>
            <th
              scope="col"
              className="px-4 py-3 flex items-center justify-center gap-4"
            >
              Actions
            </th>
          </tr>
        </thead>


        {results && results.users.length > 0 ? (
          <tbody>
            {results &&
              results.users.map((user: User) => (
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.id}
                  </th>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3 flex items-center justify-center gap-4">
                    <BsFillTrashFill
                      onClick={() => {
                        if (user.id) {
                          deleteUserMut.mutate(user.id)
                        }
                      }
                      }
                      size={22}
                      className="text-red-300 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>

        ) : (

          <tbody>
            {data &&
              data.map((user: User) => (
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.id}
                  </th>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3 flex items-center justify-center gap-4">
                    <BsFillTrashFill
                      onClick={() => {
                        if (user.id) {
                          deleteUserMut.mutate(user.id)
                        }
                      }
                      }
                      size={22}
                      className="text-red-300 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
          </tbody>

        )}

      </table>
    </div>
  );
};

export default Usuarios;