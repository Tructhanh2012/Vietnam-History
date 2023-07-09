import util from "util";
import { connectToDatabase } from "../../connection/index.js";
import { successHandler, errorHandler } from "../../handler/index.js";

export async function createPost(body) {
  const connection = connectToDatabase();
  const query = util.promisify(connection.query).bind(connection);

  try {
    const rows = await query(
      `insert into baiviet values(${body.id}, '${body.tieu_de}', '${body.noi_dung}', '${body.hinh_anh}', ${body.thoi_ky}, ${body.dia_danh})`
    );

    return successHandler({
      message: "Đọc bài viết thành công",
      data: rows,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

export async function readAllPost() {
  const connection = connectToDatabase();
  const query = util.promisify(connection.query).bind(connection);

  try {
    const rows = await query("select * from baiviet");

    return successHandler({
      message: "Đọc bài viết thành công",
      data: rows,
    });
  } catch (error) {
    return errorHandler(error);
  }
}
