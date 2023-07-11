import "./blogcard.scss";
import { callGetRanking } from "../../services/api";
import { useEffect, useState } from "react";

const BlogCard = () => {
  const [listRank, setListRank] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRankingData = async () => {
    setIsLoading(true);
    const res = await callGetRanking();
    // console.log("res ranking:", res);
    setListRank(res.data);
    console.log(listRank);
    setIsLoading(false);
  };
  useEffect(() => {
    getRankingData();
  }, []);
  return (
    <>
      <div className="blogcard">
        {listRank.slice(0, 3).map((item, index) => (
          <div
            className="wrapper"
            key={index}
          >
            <div className="profile-card js-profile-card cardd">
              <div className="profile-card__img">
                <img
                  src={
                    index === 0
                      ? "https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-gold-medal-vector-golden-1st-place-badge-sport-game-golden-challenge-png-image_1887633.jpg"
                      : index === 1
                      ? "https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-silver-medal-vector-best-first-placement-winner-champion-number-one-2nd-png-image_1888381.jpg"
                      : "https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-bronze-medal-vector-best-first-placement-winner-champion-number-one-3rd-png-image_1887553.jpg"
                  }
                  alt="medal"
                />
              </div>

              <div className="profile-card__cnt js-profile-cnt">
                <div className="profile-card__username">@{item.name}</div>
                <div className="text">
                  <h4>{`Top ${index + 1}`}</h4>
                  <div
                    className="discription"
                    style={{ margin: "20px 75px 0 75px" }}
                  >
                    <div className="text-point">
                      <h6>Tổng điểm: {item.totalPoint}</h6>
                      <h6>Tổng quiz: {item.numberOfQuiz}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="blogcard">
        <div className="wrapper">
          <div className="profile-card js-profile-card cardd">
            <div className="profile-card__img">
              <img
                src="https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-gold-medal-vector-golden-1st-place-badge-sport-game-golden-challenge-png-image_1887633.jpg"
                alt="profile card"
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__username">@tructtse</div>
              <div className="text">
                <h4>Top 1</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  cumque tempora, dolore optio cum saepe quibusdam inventore vel
                  ratione eveniet adipisci corrupti atque veniam esse vitae
                  impedit illo quas nostrum.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="profile-card js-profile-card cardd">
            <div className="profile-card__img">
              <img
                src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-silver-medal-vector-best-first-placement-winner-champion-number-one-2nd-png-image_1888381.jpg"
                alt="profile card"
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt cardd">
              <div className="profile-card__username">@tructtse</div>
              <div className="text">
                <h4>Top 2</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  cumque tempora, dolore optio cum saepe quibusdam inventore vel
                  ratione eveniet adipisci corrupti atque veniam esse vitae
                  impedit illo quas nostrum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="profile-card js-profile-card cardd">
            <div className="profile-card__img">
              <img
                src="https://png.pngtree.com/png-vector/20191027/ourmid/pngtree-bronze-medal-vector-best-first-placement-winner-champion-number-one-3rd-png-image_1887553.jpg"
                alt="profile card"
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__username">@tructtse</div>
              <div className="text">
                <h4>Top 3</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  cumque tempora, dolore optio cum saepe quibusdam inventore vel
                  ratione eveniet adipisci corrupti atque veniam esse vitae
                  impedit illo quas nostrum.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      {/* <div className="wrapper">
          <div className="profile-card js-profile-card cardd">
            <div className="profile-card__img">
              <img
                src="https://haycafe.vn/wp-content/uploads/2022/03/Avatar-hai-1.jpg"
                alt="profile card"
              />
            </div>

            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__username">@tructtse</div>
              <div className="text">
                <h4>Top 4</h4>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                  cumque tempora, dolore optio cum saepe quibusdam inventore vel
                  ratione eveniet adipisci corrupti atque veniam esse vitae
                  impedit illo quas nostrum.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};
export default BlogCard;
