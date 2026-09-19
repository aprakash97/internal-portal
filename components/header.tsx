export default function Header({ about }: { about?: string }) {
  return (
    <div className="mt-0.5 shadow-lg container mx-auto flex w-full flex-col justify-center gap-1 rounded-md bg-linear-to-r from-blue-500 to-purple-500 p-14 text-center text-white">
      <h1 className="text-xl font-semibold md:text-2xl">
        Latest news, tips and insights <b />
        {about ? `about ${about}` : 'From our tech team'}
      </h1>
      <p className="text-sx">
        Here you will find all the relevant information and stay informed!
      </p>
    </div>
  );
}
