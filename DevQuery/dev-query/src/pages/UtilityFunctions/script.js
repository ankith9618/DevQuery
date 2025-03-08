import Cookies from 'js-cookie';
const BaseUrl = process.env.REACT_APP_BASE_URL;

const postQueryUrl = `${BaseUrl}/postQuery`;
const getUserQueriesUrl = `${BaseUrl}/getUserQueries`;
const getRepliesToQueryUrl = `${BaseUrl}/getRepliesToQuery`;
const postReplyUrl = `${BaseUrl}/postReply`;
const deletedQueryUrl = `${BaseUrl}/deleteQuery`;
const deleteReplyUrl = `${BaseUrl}/deleteReply`;
const likeToQueryUrl = `${BaseUrl}/likeToQuery`;
const likeToReplyUrl = `${BaseUrl}/likeToReply`;
const verifyTokenUrl = `${BaseUrl}/verifyToken`;
const getTopQueriesUrl = `${BaseUrl}/getTopQueries`;
const getDashBoardUrl = `${BaseUrl}/dashBoard`;

export const postQuery = async ({ title, query, tags }) => {
    try {
        const response = await fetch(postQueryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ title, query, tags })
        });

        if (!response.ok) {
            console.log(response);
            console.error(new Error(`Error: ${response.status} ${response.statusText}`));
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to post query:", error);
    }
};

export const getUserQueries = async () => {
    try {
        const response = await fetch(getUserQueriesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
        });

        if (!response.ok) {
            console.error( new Error(`Error: ${response.status} ${response.statusText}`));
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to get all Queries:", error);
    }
}

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((now - past) / 1000); // Difference in seconds

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "week", seconds: 604800 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diff / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "Just now";
}

function formatDateTime(timestamp) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).format(new Date(timestamp));
}

export const smartFormatTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInDays = (now - past) / (1000 * 60 * 60 * 24);

    return diffInDays < 7 ? timeAgo(timestamp) : formatDateTime(timestamp);
}

export function filterQueries(queries, searchQuery) {
    if (!searchQuery.trim()) {
        return queries; // Return all queries if the search bar is empty
    }

    return queries.filter((q) =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
}

export async function getAllReplies(query) {
    try {
        const response = await fetch(getRepliesToQueryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ 'queryId': query["_id"] })
        });

        if (!response.ok) {
            console.error(new Error(`Error: ${response.status} ${response.statusText}`));
        }
        const data = await response.json();
        return data.replies;
    } catch (error) {
        console.error("Failed to get all Replies:", error);
    }
}

export async function postReply(query, replyText) {
    try {
        console.log(query);
        const response = await fetch(postReplyUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ 'queryId': query["_id"], "reply": replyText })
        });

        if (!response.ok) {
            console.log(response);
            console.error(new Error(`Error: ${response.status} ${response.statusText}`));
        }

        return response;
    } catch (error) {
        console.error("Failed to post Reply:", error);
    }
}

export async function deleteQuery(query) {
    try {
        const response = await fetch(deletedQueryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ "queryId": query["_id"] }),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error(new Error(data.error || "Failed to delete query"));
        }
        return data;
    } catch (error) {
        console.error("Error deleting query:", error);
    }
}

export async function deleteReply(reply) {
    try {
        const response = await fetch(deleteReplyUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ "replyId": reply["_id"] }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(new Error(data.error || "Failed to delete reply"));
        }

        return data;
    } catch (error) {
        return { error: error.message };
    }
}

export const likeToQuery = async (query) => {
    try {
        const response = await fetch(likeToQueryUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ 'queryId': query["_id"] }),
        });

        const data = await response.json();
        if (!response.ok)
            console.error(new Error(data.message || "Failed to toggle like"));

        return data; // { success: true, likesCount, likedBy }
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

export const likeToReply = async (reply) => {
    try {
        const response = await fetch(likeToReplyUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
            body: JSON.stringify({ 'replyId': reply["_id"] }),
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        }

        console.error(new Error(data.message || "Failed to toggle like"));
    } catch (error) {
        console.error("Error toggling like:", error);
    }
};

export const verifyToken = async () => {
    const token = Cookies.get("DevQuery");

    if (!token) return;

    try {
        const response = await fetch(verifyTokenUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            }
        });

        const data = await response.json();
        if (response.ok) {
            return data.user;
        }
    } catch (error) {
        console.error("Error verifying token:", error);
    }
};

export const getTopQueries = async () => {
    try {
        const response = await fetch(getTopQueriesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
        });

        if (response.ok) {
            return await response.json();
        }
        console.error( new Error(`Error: ${response.status} ${response.statusText}`));
    } catch (error) {
        console.error("Failed to get all Queries:", error);
    }
};

export const getDashBoard = async () => {
    try {
        const response = await fetch(getDashBoardUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("DevQuery")}`
            },
        });

        if (!response.ok) {
            console.error(new Error(`Error: ${response.status} ${response.statusText}`));
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to get all Queries:", error);
    }
};

