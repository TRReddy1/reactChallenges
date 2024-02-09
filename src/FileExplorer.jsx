import React, { useState } from "react";
import { v4 } from "uuid";
import FileChild from "./FileChild";

const FileExplorer = () => {
  const [show, setShow] = useState(false);
  const [showChilds, setShowChilds] = useState(false);
  const [name, setName] = useState("");
  const [create, setCreate] = useState(false);
  const [dir, setDir] = useState(false);
  const [childs, setChilds] = useState([
    {
      id: v4(),
      name: "public",
      isDir: true,
      isEdit: false,
      children: [],
    },
    {
      id: v4(),
      name: "src",
      isDir: true,
      isEdit: false,
      children: [],
    },
    {
      id: v4(),
      name: "dist",
      isDir: true,
      isEdit: false,
      children: [],
    },
  ]);

  const handleOver = (e) => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dir) {
      setChilds((old) => {
        return [
          ...old,
          {
            id: v4(),
            name: `${name}`,
            isDir: true,
            isEdit: false,
            children: [],
          },
        ];
        // return up;
      });
      setCreate(false);
      setName("");
      setDir(false);
    } else {
      setChilds((old) => {
        var up = [
          ...old,
          {
            id: v4(),
            name: `${name}`,
            isDir: false,
            isEdit: false,
            children: null,
          },
        ];
        return up;
      });
      setCreate(false);
      setName("");
      setDir(false);
    }
    console.log(childs);
  };

  const handleFolder = (id, data, m) => {
    if (m) {
      setChilds(() => {
        var curr = childs.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              children: data,
            };
          }
          return c;
        });
        return curr;
      });
    } else {
      setChilds(() => {
        var curr = childs.map((c) => {
          if (c.id === id && data.length != 0) {
            return {
              ...c,
              children: data,
            };
          }
          return c;
        });
        return curr;
      });
    }
    // console.log("inside parent", childs);
  };

  //   const handleFile = () => {};

  const handleDelte = (id) => {
    setChilds(childs.filter((c) => c.id !== id));
  };

  return (
    <>
      <div
        style={{
          margin: "2rem",
          display: "flex",
          cursor: "pointer",
          gap: "10px",
        }}
        onMouseOver={handleOver}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShowChilds(!showChilds)}
      >
        {showChilds ? "📂" : "📁"} root
        {show && (
          <>
            <button
              onClick={() => {
                setShow(true);
                setCreate(!create);
                setDir(true);
                // setChilds((old) => [
                //   ...old,
                //   { id: v4(), name: `${name}`, isDir: true, children: [] },
                // ]);
              }}
            >
              📁
            </button>{" "}
            <button
              onClick={() => {
                setShow(true);
                setCreate(!create);
                setDir(false);
                // setChilds((old) => [
                //   ...old,
                //   { id: v4(), name: `${name}`, isDir: "false", children: null },
                // ]);
              }}
            >
              📄
            </button>
          </>
        )}
      </div>
      <div style={{ margin: "3rem" }}>
        {showChilds &&
          childs.map((child) => {
            return (
              <FileChild
                key={child.id}
                child={child}
                deleteChild={handleDelte}
                updateFolder={handleFolder}
              ></FileChild>
            );
          })}
        <div>
          {showChilds && create && (
            <form onSubmit={handleSubmit}>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </form>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default FileExplorer;
