import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch topics: ${res.statusText}`);
    }

    const data = await res.json();
    return data.topics || [];
  } catch (error) {
    console.error("Error loading topics: ", error);
    throw error;
  }
};

const TopicsList = ({ topics = [] }) => (
  <>
    {topics.map((t) => (
      <div
        key={t._id}
        className="p-4 border border-gray-500 my-3 flex justify-between gap-5 items-start bg-blue-100 rounded-md"
      >
        <div>
          <h2 className="font-bold text-2xl text-indigo-700">{t.title}</h2>
          <div className="text-gray-600 italic">{t.description}</div>
        </div>

        <div className="flex gap-2">
          <RemoveBtn id={t._id} />
          <Link href={`/editTopic/${t._id}`}>
            <HiPencilAlt size={24} className="text-green-600" />
          </Link>
        </div>
      </div>
    ))}
  </>
);

export async function getServerSideProps() {
  try {
    const topics = await getTopics();
    return { props: { topics } };
  } catch (error) {
    console.error("Error fetching topics:", error);
    return { props: { topics: [] } };
  }
}

export default TopicsList;