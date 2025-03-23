export default function Signup() {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-500">
        <div className="w-64 h-80 flex justify-center items-center shadow-lg bg-red-500 rounded-md">
          This is the dialog box
        </div>
        <Heading />
      </div>
    );
  }
  
  export function Heading() {
    return (<>
      <div className="font-bold text-4xl pt-6 text-amber-300 bg-green-500 w-64 h-80">
        Sign Up
      </div>
      <div>
        <h1 className="text-xl font-bold text-red-500">is this working now , why the hell css is not working dude , i just cant figure out the problem hereeee maaaaaaaaan
          
        </h1>
      </div>
      </>
    
    );      
  }
  