import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const FileChild = ({ child, deleteChild, updateFolder }) => {
  const [show, setShow] = useState(false);
  const [showChilds, setShowChilds] = useState(false);
  const [name, setName] = useState("");
  const [create, setCreate] = useState(false);
  const [dir, setDir] = useState(false);
  const [subchilds, setSubchilds] = useState([]);

  useEffect(() => {
    updateFolder(child.id, subchilds, false);
  }, [subchilds]);

  const handleOver = (e) => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    // console.log(e.target.id);
    e.preventDefault();
    if (dir) {
      setSubchilds((old) => {
        var neww = [
          ...old,
          {
            id: v4(),
            name: `${name}`,
            isDir: true,
            isEdit: false,
            children: [],
          },
        ];
        updateFolder(child.id, neww, false);
        return neww;
      });
      setCreate(false);
      setName("");
    } else {
      setSubchilds((old) => {
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
        updateFolder(child.id, up, false);
        return up;
      });
      setCreate(false);
      setName("");
    }
    // console.log(subchilds);
  };

  const handleSubFolder = (id, data, m) => {
    // console.log(data);
    if (m) {
      setSubchilds(() => {
        var curr = subchilds.map((c) => {
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
      setSubchilds(() => {
        var curr = subchilds.map((c) => {
          if (c.id === id && data.length !== 0) {
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

    // console.log("subchilds in Child:", subchilds);
  };

  const deleteSubChild = (id) => {
    // console.log(id);
    setSubchilds(subchilds.filter((c) => c.id !== id));
    updateFolder(child.id, subchilds, true);
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
      >
        <span onClick={() => setShowChilds(!showChilds)}>
          {child.isDir ? (showChilds ? "📂" : "📁") : "📄"} {child.name}
        </span>
        {show && (
          <>
            <button
              onClick={() => {
                child.isEdit = true;
                updateFolder(child.id, subchilds);
              }}
            >
              ✏️
            </button>
            {child.isDir && (
              <button
                onClick={() => {
                  setShowChilds(true);
                  setCreate(!create);
                  setDir(true);
                  // setSubchilds((old) => [
                  //   ...old,
                  //   { id: v4(), name: `${name}`, isDir: true, children: [] },
                  // ]);
                }}
              >
                📁
              </button>
            )}
            {child.isDir && (
              <button
                onClick={() => {
                  setShowChilds(true);
                  setCreate(!create);
                  setDir(false);
                  // setSubchilds((old) => [
                  //   ...old,
                  //   { id: v4(), name: `${name}`, isDir: "false", children: null },
                  // ]);
                }}
              >
                📄
              </button>
            )}
            <button onClick={() => deleteChild(child.id)}>🗑️</button>
          </>
        )}
      </div>
      <div style={{ margin: "3rem" }}>
        {showChilds &&
          child.children.map((child) => {
            return (
              <>
                {child.isEdit ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      child.isEdit = false;
                      updateFolder(child.id, subchilds);
                    }}
                  >
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => {
                        child.name = e.target.value;
                        updateFolder(child.id, subchilds);
                      }}
                    />
                  </form>
                ) : (
                  <FileChild
                    key={child.id}
                    child={child}
                    deleteChild={deleteSubChild}
                    updateFolder={handleSubFolder}
                  ></FileChild>
                )}{" "}
              </>
            );
          })}
        <div>
          {showChilds && create && (
            <form onSubmit={handleSubmit} id={child.id}>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </form>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default FileChild;
