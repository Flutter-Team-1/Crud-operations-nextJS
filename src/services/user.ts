import { userForm } from "@/interfaces/userInterfaces";

export async function userService(userDetails: userForm) {
   try {
      const response = await fetch(`/api/user}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'action': 'create'
         },
         body: JSON.stringify(userDetails),
      });
      return await response.json();
   }
   catch (error) {
      console.error('Error fetching data:', error);
      return error;
   }
}