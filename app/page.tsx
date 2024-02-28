import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center h-lvh">
        <form action="" className="w-[500px] mr-4 text-center">

          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="text" 
            placeholder="Nome"
          />

          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="email" 
            placeholder="Email"
          />
          
          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="tel" 
            placeholder="Telefone"
          />

          <textarea 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md resize-none"
            placeholder="observação"
          ></textarea>

          <button 
            className="p-3 w-5/12 bg-green-400 border-none rounded-lg cursor-pointer transition-[filter] duration-200 ease-linear hover:brightness-90" 
            type="submit"
          >
            Salvar
          </button>
        </form>
        <div className="w-[500px] p-4 bg-green-200 h-[500px] text-center rounded-xl ml-20 overflow-auto">
          <input 
            className="w-full p-4 my-2 border border-solid border-black border-opacity-10 rounded-md"
            type="text" 
            placeholder="Buscar"
          />
          {/* A single Contact */}
          <div className="bg-green-100 rounded-lg text-left max-h-48 box-content p-3">
            <div className="flex justify-between items-center">
              <p className="text-2xl px-0.5 py-4 font-bold">Carla Gomes Farias</p>
              <div className="flex gap-3">
                <a className="text-red-800 cursor-pointer hover:text-shadow-bold" href="">Editar</a>
                <a className="text-red-800 cursor-pointer hover:text-shadow-bold" href="">Excluir</a>
              </div>
            </div>

            <div className="">
              <p>carla@outlook.com</p>
              <p>32 9 99930257</p>
              <p>Amiga da escola de musica</p>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
